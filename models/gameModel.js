const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    game: {
        type: String,
        require: true
    },
    pick: {
        type: String,
        require: true
    },
    stake: {
        type: Number,
        require: true
    },
    user: {
        id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            require: true
        },
        name: {
            type: String,
            require: true
        }
    },
    offers: [{
        offerAmount: {
            type: Number
        },
        offerType: {
            type: Number
        },
        offerStatus: {
            type: String,
            enum: ['Pending', 'Confirmed']
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
    }]
}, { timestamps: true });

const gameModel = mongoose.model('Game', gameSchema);

module.exports = gameModel;
