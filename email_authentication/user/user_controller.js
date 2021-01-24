const express = require('express');
const router = express.Router();
const passport = require('passport');
const checkAuth = require('../config/check_auth')
const userService = require('./user_service');

//routes
router.post('/register', register); //isAuthenticated 를 여기에 넣어보자.
router.post('/signin', signin);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.get('/', getAll);
router.patch('/:id', update); //checkAuth
router.delete('/:id', _delete);
//router.delete('/:id', passport.authenticate('jwt', { session: false }), _delete);

module.exports = router;


//@route POST http://localhost:5000/users/register
//@desc register
//@access Public
function register(req, res, next) {
    userService.register(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

//@route POST http://localhost:5000/users/signin
//@desc signin
//@access Public
function signin(req, res, next) {
    userService.signin(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

//@route GET http://localhost:5000/users/current
//@desc get current user
//@access Private
function getCurrent(req, res, next) {
    userService.getById(req.user.sub)//req.user is alias for req.session.user
        .then(user => user ? res.json(user) : res.sendStatus(404)) //?
        .catch(err => next(err));
}


//@route GET http://localhost:5000/users/:id
//@desc get user by id
//@access Private
function getById(req, res, next) {
    userService.getById(req.params.id)//url울 분석 id 또는 name에 있는 값을 낚아챈다.
        .then(user => res.json(user))
        .catch(err => next(err));
}


//@route GET http://localhost:5000/users/getall
//@desc get all users
//@access Private
function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}


//@route PATCH http://localhost:5000/users/:id
//@desc update
//@access Private
function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}


//@route DELETE http://localhost:5000/users/:id
//@desc delete the user
//@access Private
function _delete(req, res, next) {
    userService.delete(req.params.id) // req.params.id 로 /:id 의 값을 가지고올 수 있음. url을 분석 id or name의 값을 낚아챈다.
        .then(() => res.json('deleted successfully'))
        .catch(err => next(err));
}


