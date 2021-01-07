const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkAuth = passport.authenticate('jwt', {session: false}); //
const userService = require('./user_service');

//routes
router.post('/register', register);
router.post('/signin', signin);
router.patch('/:id', update);
router.get('/getall', getAll);
router.delete('/:id', _delete);

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


//@route PATCH http://localhost:5000/users/:id
//@desc update
//@access Private
function update(checkAuth, req, res, next) {
    userService.update(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}


//@route GET http://localhost:5000/users/getall
//@desc get all the users
//@access Private
function getAll(checkAuth, req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}


//@route DELETE http://localhost:5000/users/:id
//@desc delete the user
//@access Private
function _delete(checkAuth, req, res, next) {
    userService.delete(req.params.id) // req.params.id 로 /:id 의 값을 가지고올 수 있음. url을 분석 id or name의 값을 낚아챈다.
        .then(() => res.json({}))
        .catch(err => next(err));
}
