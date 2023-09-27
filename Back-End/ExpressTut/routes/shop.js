const express = require('express');
const router = express.Router() 
const shopController = require('../controllers/shop.js');
const path = require('path')

router.get('/',shopController.getProducts);

 module.exports = router;