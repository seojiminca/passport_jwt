const express = require('express');
const router = express.Router();
const passport = require('passport');
const userService = require('./user_service');
const {validSignup, validLogin} = require('../middleware/validation')
const {validationResult} = require('express-validator'); //validation 결과가 담긴다.
const checkAuth = passport.authenticate('jwt', { session: false });

//routes
router.post('/register', validSignup, register);
router.post('/activation/:token', activation);
router.post('/signin', validLogin, signin);
router.get('/current', checkAuth, getCurrent);
router.get('/:id', checkAuth, getById);
router.get('/', getAll);
router.patch('/:id', checkAuth, update);
router.delete('/:id', checkAuth, _delete);

module.exports = router;


//@route POST http://localhost:5000/users/register
//@desc register
//@access Public
function register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors) //errors: errors //이름이 같으니까 생략가능.
    }
    userService.register(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}


//@route    POST http://localhost:5000/users/activation/:token
//@desc     user activation / save user
//@access   Private
function activation(req, res, next){
    userService.activation(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}


//@route POST http://localhost:5000/users/signin
//@desc signin
//@access Public
function signin(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors)
    }
    userService.signin(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}


//@route GET http://localhost:5000/users/current
//@desc get current user
//@access Private
function getCurrent(req, res, next) {
    userService.getById(req.user)//req.user is alias for req.session.user
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


//@route GET http://localhost:5000/users
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


