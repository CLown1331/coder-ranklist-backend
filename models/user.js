const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserModelSchema = new Schema({ 
    Email: String,
    PasswordHash: String,
}, {
    versionKey: false,
    collection: 'Users'
});

module.exports = mongoose.model('User', UserModelSchema);