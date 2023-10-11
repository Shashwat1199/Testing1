const Comment = require("../models/comment");
const Post = require('../models/user');
exports.getComment = async (req, res, next) => {
  
  try {
    const comments = await Comment.findAll();
    res.status(200).json({ allComments: comments });
  } 
  catch (error) {
    console.log("Didn't hit " + error);
  }
};

exports.postComment = async (req, res, next) => {
  
  try {
    const content = req.body.comment;
    const postId = req.body.id;
    console.log("That's content->>>>>> " + content);
    try {
      const cdata = await Comment.create({ content : content, postId:postId});      
      console.log("That's ID " + cdata);
      res.status(200).json({ newCommentDetail: cdata });
    } catch (err) {
      console.log("Inside error block");
      res.status(500).json({ err });
    }

    console.log("This worked");
  } catch (err) {
    console.log(err);
  }
};
