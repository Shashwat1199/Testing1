const User = require('../models/user');

exports.getUser = async(req,res,next)=>{   
  try{
      const users = await User.findAll();
      
      res.status(200).json({allUsers:users});
  }
  catch(error){
      console.log("Didn't hit "+ error);
  }
};
  
exports.postUser = async(req,res)=>{

    try{
    const name = req.body.name;
    const email = req.body.email;
   
    const data = await User.create({name : name,email:email})
    res.status(200).json({newUserDetail:data});
      }
    catch(err){
        console.log("Inside error block")
        res.status(500).json({error : err.response.data})
    }
  }

  exports.deleteUser = async(req,res)=>{
    try{
     const uID = req.params.id;
     await User.destroy({where : {id : uID}});
     res.sendStatus(200);
 }
 catch(err)
{
  console.log(err);
}
}