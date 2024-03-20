const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    gameId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Game',
    },
    game: {
        type: String
    },
    pick: {
        type: String
    },
    offerAmount: {
        type: Number
    },
    offerType: {
        type: String
    },
    offerReturn: {
        type: Number
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
