const express = require('express');
const router=express.Router();
const instructor = require('../controllers/instructorController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new user
router.post('/instructor',instructor.createInstructor);
//get all user
router.get('/instructor',instructor.getAllInstructor);
//update user
router.put('/instructor/:educatorID',instructor.updateInstructor);
//delete user
router.delete('/instructor/:educatorID',instructor.deleteInstructor);
// create login
router.post('/loginInstructor',instructor.logInInstructor);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
