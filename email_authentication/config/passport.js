//const LocalStrategy = require('passport-local').Strategy;
const {Strategy, ExtractJwt} = require('passport-jwt');
//const bcrypt = require('bcrypt');
const userModel = require('../user/user_model');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY || 'secret';

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
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





// function initialize(passport, getUserByEmail, getUserById) {
//     const authenticateUser = async (email, password, done) => {
//         const user = getUserByEmail(email)
//         if (user === null) {
//             return done(null, false, {message: 'No user with that Email'})
//         }
//         try {
//             if (await bcrypt.compare(password, user.password)) {
//                 return done(null, user)
//             } else {
//                 return done(null, false, {message: 'Password incorrect'})
//             }
//         } catch (e) {
//             return done(e)
//         }
//     }
//     passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'hashed'}, authenticateUser))
//     passport.serializeUser((user, done) => { //to store inside of the session.
//         done(null, user.id)
//     })
//     passport.deserializeUser((id, done) => { //we're gonna serialize our user as a single ID
//         return done(null, getUserById(id))
//     })
//

    // const opts = {
    //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //     secretOrKey: process.env.SECRET_KEY,
    // };
    //
    // module.exports = passport => {
    //     passport.use(
    //         'jwt',
    //         new JwtStrategy(opts, (payload, done) => {
    //             userModel
    //                 .findById(payload.id)
    //                 .then(user => {
    //                     if (user) {
    //                         return done(null, user);
    //                     }
    //                     return done(null, false);
    //                 })
    //                 .catch(err => {
    //                     console.log(err)
    //                 });
    //         })
    //     );
    // }
//}

//module.exports = initialize
