const userCollection = require('./../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const tokenExpires = process.env.TOKEN_EXPIRES_IN;
const tokenIssuer = process.env.TOKEN_ISSUER;;

const VerifyPassword = async (email, password) => {
    const user = await userCollection.findOne({Email: email});
    const userExists = !!user;
    if (!userExists) {
        return false;
    }
    return bcrypt.compare(password, user.PasswordHash);
};

const IssueToken = (email) => {
    const token = jwt.sign({
    }, jwtSecret, {
        subject: email,
        expiresIn: tokenExpires,
        issuer: tokenIssuer,
    });
    return {
        'access_token': token,
        'expires': tokenExpires,
    };
};

module.exports = {
    VerifyPassword,
    IssueToken
};