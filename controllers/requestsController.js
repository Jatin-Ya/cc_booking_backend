const mongoose = require('mongoose');
const sendEmail = require('../utils/email');

const Request = require('../models/requestsModel');

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
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
    const reqObj = {
      title: req.body.title,
      description: req.body.description,
      beginning_time: req.body.beginning_time,
      ending_time: req.body.ending_time,
      // user: req.body.user,
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
    const request = await Request.findById(req.params.id);
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
