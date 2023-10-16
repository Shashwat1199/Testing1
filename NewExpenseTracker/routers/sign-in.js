const path = require('path');
const express = require('express');
const userController = require('../controllers/sign-in');
const router = express.Router();


router.post('/user/sign-up', userController.postUser);


module.exports = router;