const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique:true },
  image: { type: String, required: true },
  designation: { type: String, default: 'User' },
  // password: { type: String, required: true },
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Request' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
