const express = require('express');
const router=express.Router();
const mentorship = require('../controllers/mentorshipController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new user
router.post('/mentorship',mentorship.createMentorship);
//get all user
router.get('/mentorship',mentorship.getAllMentorship);
//update user
router.put('/mentorship/mentorID:',mentorship.updateMentorship);
//delete user
router.delete('/mentorship/:mentorID',mentorship.deleteMentorship);
// create login
router.post('/loginMentorship',mentorship.logInMentorship);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
