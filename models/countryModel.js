const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    competitions: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Competition'
    }]
}, {timestamps: true});

const countryModel = mongoose.model('Country', countrySchema);

module,exports = countryModel;
