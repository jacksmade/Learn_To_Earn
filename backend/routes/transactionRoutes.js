const express = require('express');
const router=express.Router();
const transaction = require('../controllers/transactionController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new user
router.post('/transaction',transaction.createTransaction);
//get all user
router.get('/transaction',transaction.getAllTransaction);
//update user
router.put('/transaction/:transactionID',transaction.updateTransaction);
//delete user
router.delete('/transaction/:transactionID',transaction.deleteTransaction);
// create login
router.post('/loginTransaction',transaction.logInTransaction);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
