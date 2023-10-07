const Comment = require('../models/comment');

exports.getComment = async(req,res,next)=>{   
  try{
      const comments = await Comment.findAll();      
      res.status(200).json({allComments:comments});
  }
  catch(error){
      console.log("Didn't hit "+ error);
  }
};
  
exports.postComment = async(req,res)=>{

try{
    const content = req.body.comment; 
    try{
    const cdata = await Comment.create({content : content})
    res.status(200).json({newCommentDetail:cdata});
    }
    catch(err){
        console.log("Inside error block")
        res.status(500).json({error : err.response.data})
    }
    console.log("This worked");
 }
  catch(err){
        console.log(err.response.data);
    }
}