const userModel = require('./user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register,
    signin,
    getById,
    getAll,
    update,
    delete: _delete
}


//@route POST http://localhost:5000/users/register
//@desc register
//@access Public
async function register(userParam) {
    if(await userModel.findOne({email: userParam.email})){
        throw 'Email " ' + userParam.email + '" is already taken'; //'throw' throws user-defined exception. if no catch block exists, the program will terminate.
    }

    const newUser = new userModel(userParam);

    if(userParam.password){
        newUser.hashed = await bcrypt.hashSync(userParam.password, 10); //password가 같아도 salt를 사용함으로써 hashed가 다르게 된다.
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


//@route GET http://localhost:5000/users/current
//@route GET http://localhost:5000/users/:id
//@desc get current user
//@access Private
async function getById(id){
    return await userModel.findById(id);
}


//@route GET http://localhost:5000/users/getall
//@desc get all users
//@access Private
async function getAll() {
    //role에 따라서 다르게 보이게.
    return await userModel.find();
}

/*
router.get('/users', checkAuth, (req, res) => {
   userModel
       .findById(req.user.id)
       .exec()
       .then(user => {
           if(user.role !== 'admin'){
               res.json({
                   error: 'It is not permitted'
               })
           }
           userModel
               .find()
               .then(docs => {
                   res.json({
                       count: docs.length,
                       userList: docs
                   })
               })
       })
       .catch(err => {
          res.json({
             error: err
          });
       });
});
 */


//@route PATCH http://localhost:5000/users/:id
//@desc update
//@access Private
async function update(id, userParam){
    const user = await userModel.findById(id);

    /** @namespace user.name **/
    //https://stackoverflow.com/questions/20835544/how-to-fight-tons-of-unresolved-variables-warning-in-webstorm

    if(!user) throw 'User not found';
    if(user.name !== userParam.name && await userModel.findOne({name: userParam.name})){
        throw 'Username "' + userParam.username + '" is already taken';
    }

    if(userParam.password){
        userParam.hashed = await bcrypt.hashSync(userParam.password, 10);
    }

    //Object.assign - copy objects to target object. (target, source)
    Object.assign(user, userParam);

    await user.save();

    return user;
}


//@route DELETE http://localhost:5000/users/:id
//@desc delete the user
//@access Private
async function _delete(id){
    await userModel.findByIdAndRemove(id);
}
