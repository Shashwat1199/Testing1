const Post = require('../models/user');

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
   
    console.log(imageURL + " " + description);
    try{
    const data = await Post.create({imageURL : imageURL, description : description})
    //data.then(result)
    console.log("User Created! This worked")
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