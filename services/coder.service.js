const { update } = require('./../models/coder');
const coderCollection = require('./../models/coder');

const Upsert = async (id, payload) => {
    return coderCollection.findOneAndUpdate({_id: id}, payload, {
        new: true,
        upsert: true,
    });
};

module.exports = {
    Upsert,
}