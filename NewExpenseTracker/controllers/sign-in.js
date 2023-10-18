const User = require('../models/sign-up');

exports.login = async(req, res)=>
{
try
{
const {email,password} = req.body;

const user = await User.findAll({ where : {email}})
console.log(user[0].email)
if(user.length > 0)
{
    if(user[0].password == password){
        res.status(200).json({success : true, message :"User logged in successfully"})
    }
    else{
        return res.status(400).json({success : false, message :"Password is incorrect"})
    }
}
else {
    return res.status(404).json({success : false, message :"User doesn't exist"})
  }

}
catch(err){
    res.status(500).json({message : err, success : false})
}
}

// module.exports = login;