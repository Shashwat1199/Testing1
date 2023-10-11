const path = require('path');
const express = require('express');
const userController = require('../controllers/user');
const commentController = require('../controllers/comment');
const router = express.Router();


router.get('/post/get-posts', userController.getUser);

router.post('/post/add-post', userController.postUser);

router.post('/post/add-comment', commentController.postComment);

router.get('/post/get-comments', commentController.getComment);

router.delete('/user/delete-post/:id', userController.deleteUser);


module.exports = router;