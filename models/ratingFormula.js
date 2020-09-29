const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RatingFormulaModelSchema = new Schema({
    Formula: String,
}, {
    versionKey: false,
    collection: 'RatingFormulas'
});

module.exports = mongoose.model('RatingFormula', RatingFormulaModelSchema);