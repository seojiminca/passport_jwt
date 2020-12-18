const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotEnv = require('dotenv');
dotEnv.config();

const app = express();
require('./config/db');

const userRouter = require('./user/user_controller');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    }))
    app.use(morgan('dev'));
}

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser(process.env.SECRET_KEY)) //same secret key with session.

//router
app.use('/users', userRouter);

//start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server has started at http://localhost:${PORT}`);
})
