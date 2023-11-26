const express = require('express');
const router=express.Router();
const mentorship = require('../controllers/mentorshipController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new mentorship
router.post('/mentorship',mentorship.createMentorship);
//get all mentorship
router.get('/mentorship',mentorship.getAllMentorship);
//update mentorship
router.put('/mentorship/mentorID:',mentorship.updateMentorship);
//delete mentorship
router.delete('/mentorship/:mentorID',mentorship.deleteMentorship);
// create login for mentorship
router.post('/loginMentorship',mentorship.logInMentorship);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
