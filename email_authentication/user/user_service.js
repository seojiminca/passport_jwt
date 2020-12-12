const express = require('express');
const userModel = require('./user_model');

module.exports = {
    register,
    signin
}

//@route POST http://localhost:5000/users
//@desc register
//@access Public
async function register(userParam) {

}


//@route POST http://localhost:5000/users/signin
//@desc signin
//@access Public
async function signin({email, password}) {

}
