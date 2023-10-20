const path = require('path');
const express = require('express');
const userController = require('../controllers/expense');
const router = express.Router();


router.post('/expense/add-expense', userController.postExpense);
router.get('/expense/get-expenses', userController.getExpense);

module.exports = router;