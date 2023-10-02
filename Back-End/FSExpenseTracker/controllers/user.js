const Record = require('../models/user');
const uuid = require('uuid').v4

exports.getUser = async(req,res,next)=>{   
  try{
      const records = await Record.findAll();      
      res.status(200).json({allRecords:records});
  }
  catch(error){
      console.log("Didn't hit "+ error);
  }
};
  
exports.postUser = async(req,res)=>{

    try{
    const amount = req.body.amount;
    const description = req.body.description; 
    const data = await Record.create({amount : amount, description:description})
    res.status(200).json({newRecordDetail:data});     
  }
  catch(err){
        console.log("Inside error block")
        res.status(500).json({error : err.response.data})
    }
  }

 exports.deleteUser = async(req,res)=>{
    try{
     const uID = req.params.id;
     await Record.destroy({where : {id : uID}});
     res.sendStatus(200);
 }
 catch(err)
{
  console.log(err);
}
}