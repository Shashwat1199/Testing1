const Post = require('../models/user');
const uuid = require('uuid').v4

exports.getUser = async(req,res,next)=>{   
  try{
      const posts = await Post.findAll();      
      res.status(200).json({allPosts:posts});
  }
  catch(error){
      console.log("Didn't hit "+ error);
  }
};
  
exports.postUser = async(req,res)=>{

    try{
    const imageURL = req.body.image;
    const description = req.body.description; 
    const comment = req.body.comment;
    console.log(imageURL + " " + description);
    try{
    const data = await Post.create({imageURL : imageURL, description : description,comment : comment})
    //console.log("This worked")
    res.status(200).json({newPostDetail:data});     
    }
    catch(err){
      console.log('Mainerror' + " " + err);
    }
  }
  catch(err){
        console.log("Inside error block")
        res.status(500).json({error : err.response.data})
    }
  }

 exports.deleteUser = async(req,res)=>{
    try{
     const uID = req.params.id;
     await Post.destroy({where : {id : uID}});
     res.sendStatus(200);
 }
 catch(err)
{
  console.log(err);
}
}