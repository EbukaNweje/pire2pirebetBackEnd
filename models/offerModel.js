const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    game: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Game',
    },
    offerAmount: {
        type: Number
    },
    offerType: {
        type: String
    },
    offerBy: {
        id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
        }
    },

}, { timestamps: true });

const offerModel = mongoose.model('Offer', offerSchema);

module.exports = offerModel;
