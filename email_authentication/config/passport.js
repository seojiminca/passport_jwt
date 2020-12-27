const LocalStrategy = require('passport-local').Strategy;

function initialize(passport) {
    const authenticateUser = (email, hashed, done) => {

    }
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'hashed'}), authenticateUser)
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
}
