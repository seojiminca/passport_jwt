const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register,
    signin,
    //update
}


//@route POST http://localhost:5000/users/register
//@desc register
//@access Public
async function register(userParam) {
    if(await userModel.findOne({email: userParam.email})){
        throw 'Email " ' + userParam.email + '" is already taken';
    }

    const newUser = new userModel(userParam);

    if(userParam.password){
        newUser.hashed = await bcrypt.hashSync(userParam.password, 10);
    }

    return await newUser.save();
}


//@route POST http://localhost:5000/users/signin
//@desc signin
//@access Public
async function signin({email, password}) {
    const user = await userModel.findOne({email})

    if(user && bcrypt.compareSync(password, user.hashed)){
        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn:3600});

        return{
            ...user.toJSON(),
            token
        }
    }
}

/*
//@route PATCH http://localhost:5000/users/update
//@desc update
//@access Private
async function update({}){

}
*/
