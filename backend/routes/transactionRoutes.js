const express = require('express');
const router=express.Router();
const transaction = require('../controllers/transactionController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new transaction
router.post('/transaction',transaction.createTransaction);
//get all transaction
router.get('/transaction',transaction.getAllTransaction);
//update transaction
router.put('/transaction/:transactionID',transaction.updateTransaction);
//delete transaction
router.delete('/transaction/:transactionID',transaction.deleteTransaction);
// create login for transaction
router.post('/loginTransaction',transaction.logInTransaction);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
