const express = require('express');
const userController1 = require('../controllers/user');
const userController2 = require('../controllers/user');
const userController3 = require('../controllers/forgotPassword');

const router = express.Router();

router.post('/user/sign-up', userController1.postUser);

router.post('/user/sign-in', userController2.login);

router.post('/password/forgot-password', userController3.forgotPassword)


module.exports = router;