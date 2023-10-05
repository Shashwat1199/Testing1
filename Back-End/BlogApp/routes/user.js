const path = require('path');
const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();


router.get('/post/get-posts', userController.getUser);

router.post('/post/add-post', userController.postUser);

router.delete('/user/delete-post/:id', userController.deleteUser);


module.exports = router;