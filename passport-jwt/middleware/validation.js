const {check} = require('express-validator');

exports.validSignup = [
    check('name', 'Name is required').notEmpty() //이름이 비어있으면 나오는 메세지.
        .isLength({min:4, max:32})
        .withMessage('name must be between 4 to 32 characters'), // 길이가 안맞았을때 나오는 메세지.
    check('email')
        .isEmail()
        .withMessage('Email must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password')
        .isLength({min: 6})
        .withMessage('password must contain at least 6 characters')
        .matches(/\d/) //number 표시.
        .withMessage('password must contain a number')
]

exports.validLogin = [
    check('email')
        .isEmail()
        .withMessage('Email must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password')
        .isLength({min: 6})
        .withMessage('password must contain at least 6 characters')
        .matches(/\d/) //number 표시.
        .withMessage('password must contain a number')
]
