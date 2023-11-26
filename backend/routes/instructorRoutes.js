const express = require('express');
const router=express.Router();
const instructor = require('../controllers/instructorController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new intructor
router.post('/instructor',instructor.createInstructor);
//get all instructor
router.get('/instructor',instructor.getAllInstructor);
//update instructor
router.put('/instructor/:educatorID',instructor.updateInstructor);
//delete instructor
router.delete('/instructor/:educatorID',instructor.deleteInstructor);
// create login for instructor
router.post('/loginInstructor',instructor.logInInstructor);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
