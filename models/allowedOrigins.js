const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AllowedOriginSchema = new Schema({
    Origin: String,
}, {
    versionKey: false,
    collection: 'AllowedOrigins'
});

module.exports = mongoose.model('AllowedOrigin', AllowedOriginSchema);