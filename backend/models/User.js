// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   userName: { type: String, required: true },
//   password: { type: String, required: true }
// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/, 
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Admin', adminSchema);
