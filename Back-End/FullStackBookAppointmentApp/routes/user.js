const path = require('path');
const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();


router.get('/user/get-users', userController.getUser);

router.post('/user/add-user', userController.postUser);

router.delete('/user/delete-user/:id', userController.deleteUser);


module.exports = router;