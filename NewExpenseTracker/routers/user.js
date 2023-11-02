const express = require('express');
const userController1 = require('../controllers/sign-up');
const userController2 = require('../controllers/sign-in');
const router = express.Router();


router.post('/user/sign-up', userController1.postUser);

router.post('/user/sign-in', userController2.login);


module.exports = router;