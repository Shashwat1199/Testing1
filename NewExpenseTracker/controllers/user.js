const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'secretkey';

exports.generateAccessToken = (id, ispremiumuser)=>
{
    try{
    return jwt.sign({userId : id, ispremiumuser}, secretKey)
    }
    catch(err)
    {
        console.log("JSON way errror " + err);
    }
}

function generateAccessToken(id, ispremiumuser)
{
    try{
    return jwt.sign({userId : id, ispremiumuser}, secretKey)
    } 
    catch(err)
    {
    console.log("JSON way errror " + err);
    }
}
exports.login = async(req, res)=>
{
try
{
const {email,password} = req.body;

const user = await User.findAll({ where : {email}})

if(user.length > 0)
{
    bcrypt.compare(password, user[0].password, (err, result)=>{     
           
    if(err)
    {
    console.log("Incoming Error "  +  err);    
    throw new Error("Something went wrong");    
    }
    if(result == true){
        try{
        res.status(200).json({success : true, message :"User logged in successfully", token: generateAccessToken(user[0].id, user[0].ispremiumuser)}) 
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
    //console.log("->->->->->->->->->Coming here also "+ err)
    res.status(500).json({message : err, success : false})
}
}
function isstringInvalid(string)
  {
    if(string == undefined || string.length == 0)
    return true;
    else
    return false;
  }
exports.postUser = async(req,res)=>{
  
    try{
      const name = req.body.name;
      const email = req.body.email; 
      const password = req.body.password;
    
      if(isstringInvalid(name) || isstringInvalid(email) || isstringInvalid(password))
      {
        console.log("Invalid Inputs")
        return res.status(400).json({err : "Error Invalid Inputs"})
      }

      const saltrounds = 1;
      try{
      bcrypt.hash(password, saltrounds, async(err, hash)=>{
        const data = await User.create({name : name, email : email ,password : hash}) 
        
        res.status(200).json({newUserDetail:data}); 
       })        
      }      
      catch(err){
        if(err == 'SequelizeUniqueConstraintError: Validation error')
        res.status(201).json("Already used credential"); 
        //console.log("This is error " + err);
      }  
             
    }

    catch(err){
         //console.log("Inside error block")
          //console.log(">>>>> "+ err);
          res.status(500).json({error : err.response.data})
      }
    }