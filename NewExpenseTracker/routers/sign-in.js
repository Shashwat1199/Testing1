const path = require('path');
const express = require('express');
const userController = require('../controllers/sign-in');
const router = express.Router();


router.post('/user/sign-in', userController.login);


module.exports = router;