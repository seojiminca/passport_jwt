const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotEnv = require('dotenv');
dotEnv.config();

const app = express();
require('./config/db');

const userRouter = require('./user/user_controller');

//middleware
app.use(bodyParser.json()); //
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.SECRET_KEY)) //same secret key with session.
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    }))
    app.use(morgan('dev'));
}
const initializePassport = require('./config/passport');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

//required for passport
app.use(session({
    secret: process.env.SECRET_KEY, //session을 암호화해줌.
    resave: false, //Should you resave if nothing has changed.
    saveUninitialized: false //Do you want to save empty value in the session if there is no value.
}));
app.use(passport.initialize());
app.use(session());


//router
app.use('/users', userRouter);

//start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server has started at http://localhost:${PORT}`);
})
