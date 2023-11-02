const jwt = require('jsonwebtoken');
const User = require('../models/users');
const secretKey =  'secretkey';
exports.Authenticate = (req, res, next) =>{

    try{
        const token = req.header('Authorization');
        //console.log(token);
        //console.log('Header >>>>  ' + req.header);
        const user = jwt.verify(token, secretKey);
        //console.log("user>>>>> "+ user.userId);
        User.findByPk(user.userId).then(user =>{
            //console.log("user----->>>>" + user);
            req.user = user;
            next();
        }).catch(err => {throw new Error(err)})
    }
    catch(err){
        console.log('error coming ' + err);
        return res.status(401).json({success:false})
    }
}

