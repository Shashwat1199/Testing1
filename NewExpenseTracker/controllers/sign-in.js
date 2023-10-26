const User = require('../models/sign-up');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'secretkey';
exports.login = async(req, res)=>
{
try
{
const {email,password} = req.body;

const user = await User.findAll({ where : {email}})
console.log(user[0].email)
if(user.length > 0)
{
    bcrypt.compare(password, user[0].password, (err, result)=>{
     
        function generateAccessToken(id)
        {
            console.log(">>>>>>>>>>>>coming here id is " + id)
            try{
            return jwt.sign({userId : id}, secretKey)
            }
            catch(err)
            {
                console.log("JSON way errror " + err);
            }
        }    
    if(err)
    {
    console.log("Incoming Error "  +  err);    
    throw new Error("Something went wrong");    
    }
    if(result == true){
        try{
        res.status(200).json({success : true, message :"User logged in successfully", token: generateAccessToken(user[0].id)}) 
        }
  catch(err)
  {
    console.log("here's the req error "+ err);
  }

}
    else
        return res.status(400).json({success : false, message :"Password is incorrect"})
})
    
}
else 
    return res.status(404).json({success : false, message :"User doesn't exist"})
}
catch(err){
    console.log("->->->->->->->->->Coming here also")
    res.status(500).json({message : err, success : false})
}
}
