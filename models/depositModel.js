const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: 'Deposit'
    },
    paymentId: {
        type: String,
    },
    type: {
        type: String,
        default: 'BTC',
    },
    proofOfPayment: {
        type: String,
        required: true
    },
    filePublicId: {
        type: String,
        required: true
    },
    info: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    address: {
        type: String,
        default: process.env.ADMINWALLET
    },
    status: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
    },

}, { timestamps: true });

const depositModel = mongoose.model('Deposit', depositSchema);

module.exports = depositModel;
