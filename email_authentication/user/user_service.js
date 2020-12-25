const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    register,
    signin,
    getAll,
    update
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


//@route PATCH http://localhost:5000/users/update
//@desc update
//@access Private
async function update({}){

}

//@route GET http://localhost:5000/users/
//@desc get all the users
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
