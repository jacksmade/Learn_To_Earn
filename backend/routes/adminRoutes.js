const express = require('express');
const router=express.Router();
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new user
router.post('/admin',admin.createAdmin);
//get all user
router.get('/admin',admin.getAllAdmin);
//update user
router.put('/admin/:adminID',admin.updateAdmin);
//delete user
router.delete('/admin/:adminID',admin.deleteAdmin);
// create login
router.post('/loginAdmin',admin.logIn);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
