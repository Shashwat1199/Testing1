const express = require('express');
const router = express.Router() 

const adminController = require('../controllers/admin.js') 

router.get('/add-product',adminController.getadmin);

router.post('/add-product',adminController.postadmin)


module.exports = router;