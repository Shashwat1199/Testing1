const path = require('path');
const express = require('express');
const userController = require('../controllers/sign-up');
const router = express.Router();


// router.get('/user/get-users', userController.getUser);

router.post('/user/sign-up', userController.postUser);

// router.delete('/user/delete-user/:id', userController.deleteUser);


module.exports = router;