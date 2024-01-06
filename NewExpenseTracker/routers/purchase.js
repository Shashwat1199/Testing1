const express = require('express');
const userAuthentication = require('../middleware/auth')
const purchaseController = require('../controllers/purchase');
const premiumFeature = require('../controllers/premiumFeature');
const router = express.Router();

router.get('/purchase/premium-user' ,userAuthentication.Authenticate, purchaseController.purchasePremium);

router.post('/purchase/update-transaction-status' ,userAuthentication.Authenticate, purchaseController.updateTransactionStatus);

router.get('/purchase/showLeaderBoard' ,userAuthentication.Authenticate, premiumFeature.getUserLeaderBoard);

router.get('/purchase/download' ,userAuthentication.Authenticate, premiumFeature.downloadExpense);


module.exports = router;