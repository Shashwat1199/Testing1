const express = require('express');
const router = express.Router() 
const contactController = require('../controllers/contact.js') 


router.get('/contact-us',contactController.getcontact,);

router.post('/contact-us',contactController.postcontact)


module.exports = router;