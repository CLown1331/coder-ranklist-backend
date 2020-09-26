const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/coder-ranklist-dev';

module.exports = mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});