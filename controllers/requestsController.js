const mongoose = require('mongoose');
const sendEmail = require('../utils/email');

const Request = require('../models/requestsModel');
const User = require('../models/userModel');
const { findOne } = require('../models/userModel');

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('user');
    res.status(200).json({
      status: 'success',
      results: requests.length,
      data: {
        requests,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createRequest = async (req, res) => {
  try {
    console.log('inside create request');

    const user = await User.findOne({ email: req.body.user });

    const reqObj = {
      title: req.body.title,
      description: req.body.description,
      beginning_time: req.body.beginning_time,
      ending_time: req.body.ending_time,
      user: user._id,
      status: req.body.status || 'Pending',
    };
    const options = {
      email: process.env.POC_EMAIL,
      subject: `New Booking Request for ${reqObj.title}`,
      message: `A new booking request has been created. ${'User'} needs CC for ${
        reqObj.title
      }, ${
        reqObj.description
      }. \nPlease login to the admin panel to view the request.`,
    };
    await sendEmail(options);
    console.log(reqObj);
    const newRequest = await Request.create(reqObj);
    user.requests.push(newRequest._id);
    await user.save();
    res.status(201).json({
      status: 'success',
      data: {
        request: newRequest,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('user');
    res.status(200).json({
      status: 'success',
      data: {
        request,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    await Request.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

const formatTime = (time) => {
  const hour = time.getHours();
  const minute = time.getMinutes();
  const formattedTime = `${hour}:${minute}`;
  return formattedTime;
}

exports.approveRequest = async (req, res) => {
  if (req.body.email !== process.env.POC_EMAIL) {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not authorized to accept requests.',
    });
  }
  try {
    const request = await Request.findById(req.params.id).populate('user');
    request.status = 'Approved';
    await request.save();
    const options = {
      email: request.user.email,
      subject: `Booking Request for ${request.title} Approved`,
      message: `Your booking request for ${request.title} from ${request.beginning_time.getDate()}/${request.beginning_time.getMonth()+1}/${request.beginning_time.getFullYear()} at ${formatTime(request.beginning_time)} to ${request.ending_time.getDate()}/${request.ending_time.getMonth()+1}/${request.ending_time.getFullYear()} at ${formatTime(request.ending_time)} has been approved.`,
    };
    await sendEmail(options);
    res.status(200).json({
      status: 'success',
      data: {
        request,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
}

exports.rejectRequest = async (req, res) => {
  if (req.body.email !== process.env.POC_EMAIL) {
    return res.status(401).json({
      status: 'fail',
      message: 'You are not authorized to reject requests.',
    });
  }
  try {
    const request = await Request.findById(req.params.id).populate('user');
    request.status = 'Rejected';
    await request.save();
    const options = {
      email: request.user.email,
      subject: `Booking Request for ${request.title} Rejected`,
      message: `Your booking request for ${request.title} from ${request.beginning_time.getDate()}/${request.beginning_time.getMonth()+1}/${request.beginning_time.getFullYear()} at ${formatTime(request.beginning_time)} to ${request.ending_time.getDate()}/${request.ending_time.getMonth()+1}/${request.ending_time.getFullYear()} at ${formatTime(request.ending_time)} has been rejected.`,
    };
    await sendEmail(options);
    res.status(200).json({
      status: 'success',
      data: {
        request,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
}
