const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  fanClub: {
    type: String,
    required: true,
    lowercase: true,
    uppercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  birthday: {
    day: {
      type: Number,
      required: true
    },
    month: {
      type: String,
      required: true,
      uppercase: true,
    },
    year: {
      type: Number,
      required: true
    },
  },
  deposit: [{
    type: String,
  }],
  withdraw: [{
    type: String
  }],
  bitcoinAddress: {
    type: String,
    trim: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  lastOtpId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OTP'
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
