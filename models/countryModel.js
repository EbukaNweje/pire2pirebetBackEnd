const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    countryName: {
        type: String,
        require: true
    },
    leagues:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "league"
    }]
}, { timestamps: true });

const countryModel = mongoose.model('country', countrySchema);

module.exports = countryModel;
