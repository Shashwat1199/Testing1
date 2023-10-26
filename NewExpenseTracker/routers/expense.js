const express = require('express');
const userAuthentication = require('../middleware/auth')
const userController = require('../controllers/expense');
const router = express.Router();


router.post('/expense/add-expense' ,userAuthentication.Authenticate, userController.postExpense);

router.get('/expense/get-expenses' ,userAuthentication.Authenticate, userController.getExpense);

router.delete('/expense/delete-expense/:expenseid', userAuthentication.Authenticate, userController.deleteExpense)


module.exports = router;
