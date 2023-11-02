const User = require('../models/users');
const bcrypt = require('bcrypt');
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
        console.log("Dekho isse >>>>>>>" +  err);
        res.status(200).json({newUserDetail:data}); 
       })        
      }      
      catch(err){
        if(err == 'SequelizeUniqueConstraintError: Validation error')
        res.status(201).json("Already used credential"); 
        console.log("This is error " + err);
      }  
             
    }

    catch(err){
          console.log("Inside error block")
          console.log(">>>>> "+ err);
          res.status(500).json({error : err.response.data})
      }
    }