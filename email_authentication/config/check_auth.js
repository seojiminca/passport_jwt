const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];//사용자입력값 토큰이 들어갈 자리명시.
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userData = decoded;
        next();
    }catch (error){
        return res.json({
            message: 'Auth failed'
        });
    }
}
