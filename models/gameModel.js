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
    date: {
        type: String
    },
    time: {
        type: String
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
}, { timestamps: true });

const gameModel = mongoose.model('Game', gameSchema);

module.exports = gameModel;
