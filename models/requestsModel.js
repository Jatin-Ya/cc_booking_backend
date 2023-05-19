const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  title : { type: String, required: true },
  description : { type: String, required: true },
  date : { type: Date, default: Date.now },
  status : { type: String, default: 'Pending' },
  user : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  beginning_time : { type: Date, required: true },
  ending_time : { type: Date, required: true },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;