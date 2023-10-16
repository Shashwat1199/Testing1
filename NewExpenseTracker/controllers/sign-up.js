const User = require('../models/sign-up');

function isstringInvalid(string)
  {
    if(string == undefined || string.length() == 0)
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
      return res.status(400).json({err : "Error Invalid Inputs"})

      try{
      const data = await User.create({name : name, email : email ,password : password})
      res.status(200).json({newUserDetail:data}); 
      }

      catch(err){
        if(err == 'SequelizeUniqueConstraintError: Validation error')
        res.status(201).json("Already used credential"); 
        console.log("This is error " + err);
      }          
    }
    catch(err){
          console.log("Inside error block")
          res.status(500).json({error : err.response.data})
      }
    }