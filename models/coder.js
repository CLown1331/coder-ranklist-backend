const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CoderModelSchema = new Schema({ 
    _id: {
        type: String,
        alias: 'Id',
    },
    Name: String,
    Codeforces: String,
    CodeChef: String,
    Rating: Number,
    CodeforcesRating: Number,
    CodeChefRating: Number,
    Marks: Number,
}, {
    versionKey: false,
    collection: 'Coders'
});

module.exports = mongoose.model('Coder', CoderModelSchema);