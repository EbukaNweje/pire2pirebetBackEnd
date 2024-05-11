const mongoose = require('mongoose');

const postGameSchema = new mongoose.Schema({
    country: {
        type: String,
        require: true
    },
    league: {
        type: String,
        require: true
    },
    homeTeam: {
        type: String,
        require: true
    },
    awayTeam: {
        type: String,
        require: true
    },
    homeOdd: {
        type: Number,
        require: true
    },
    awayOdd: {
        type: Number,
        require: true
    },
    drawOdd: {
        type: Number,
        require: true
    },
    matchDate: {
        type: String,
        require: true
    },
    matchTime: {
        type: String,
        require: true
    },
   
}, { timestamps: true });

const postGameModel = mongoose.model('postGame', postGameSchema);

module.exports = postGameModel;
