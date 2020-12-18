const express = require('express');
const router = express.Router();

const userService = require('./user_service');

//routes
router.post('/register', register);
router.post('/signin', signin);
router.patch('/update', update);

module.exports = router;


//@route POST http://localhost:5000/users/register
//@desc register
//@access Public
function register(req, res, next) {
    userService.register(req.body)
        .then((user) => res.json({user}))
        .catch(err => next(err));
}

//@route POST http://localhost:5000/users/signin
//@desc signin
//@access Public
function signin(req, res, next) {
    userService.signin(req.body)
        .then((user) => res.json({user}))
        .catch(err => next(err));
}

//@route PATCH http://localhost:5000/users/update
//@desc update
//@access Private
function update(req, res, next) {
    userService.update(req.body)
        .then((user) => res.json({user}))
        .catch(err => next(err));
}



