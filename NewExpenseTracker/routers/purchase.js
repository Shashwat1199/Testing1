const express = require('express');
const userAuthentication = require('../middleware/auth')
const purchaseController = require('../controllers/purchase');
const router = express.Router();


router.get('/purchase/premium-user' ,userAuthentication.Authenticate, purchaseController.purchasePremium);

router.post('/purchase/update-transaction-status' ,userAuthentication.Authenticate, purchaseController.updateTransactionStatus);


module.exports = router;