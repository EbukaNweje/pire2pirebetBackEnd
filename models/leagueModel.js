const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    leagueName: {
        type: String,
        require: true
    },
    country:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "country"
    }
}, { timestamps: true });

const leagueModel = mongoose.model('league', leagueSchema);

module.exports = leagueModel;
