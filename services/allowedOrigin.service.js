const allowedOriginCollection = require('./../models/allowedOrigins');

const GetAllowedOrigins = async () => {
    const allowedOrigins = await allowedOriginCollection.find();
    return allowedOrigins.map(allowedOrigin => allowedOrigin.Origin);
};

module.exports = {
    GetAllowedOrigins
};