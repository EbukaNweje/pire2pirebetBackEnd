const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    label: {
        type: String,
        default: 'Withdraw'
    },
    type: {
        type: String,
        default: 'BTC',
    },
    info: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    status: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
    },
    date: {
        type: String,
    },

}, {timestamps: true});



const withdrawModel = mongoose.model('Withdraw', withdrawSchema);

module.exports = withdrawModel;
