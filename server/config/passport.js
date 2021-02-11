//const {Strategy, ExtractJwt} = require('server'); //여기서는 JwtStrategy 사용못함. type error!
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('../user/user_model');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY || 'secret';

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (payload, done) => {
            userModel
                .findById(payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => {
                    console.log(err)
                });
        })
    );
};
