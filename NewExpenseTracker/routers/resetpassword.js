const express = require('express');

const resetpasswordController = require('../controllers/forgotPassword');

const router = express.Router();

router.get('/password/updatepassword/:resetpasswordid', resetpasswordController.updatepassword)

router.get('/password/resetpassword/:id', resetpasswordController.resetpassword)

router.use('/password/forgot-password', resetpasswordController.forgotpassword)

module.exports = router;