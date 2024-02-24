const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    uppercase: true,
    required: true,
    trim: true,
  },
  userName: {
    type: String,
    uppercase: true,
    required: true,
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
    },
    month: {
      type: String,
      uppercase: true,
    },
    year: {
      type: Number,
    },
  },
  deposits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deposit'
  }],
  withdraws: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Withdraw'
  }],
  balance: {
    type: Number,
  },
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
