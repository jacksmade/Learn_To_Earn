const express = require('express');
const router=express.Router();
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new admin
router.post('/admin',admin.createAdmin);
//get all admin
router.get('/admin',admin.getAllAdmin);
//update admin
router.put('/admin/:adminID',admin.updateAdmin);
//delete admin
router.delete('/admin/:adminID',admin.deleteAdmin);
// create Admin login
router.post('/loginAdmin',admin.logIn);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
