const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cookieExtractor = require('./cookieExtractor');
const opts = {}

opts.jwtFromRequest = ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), cookieExtractor]);
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = () => new JwtStrategy(opts, function(jwt_payload, done) {
    done(null, true);
});