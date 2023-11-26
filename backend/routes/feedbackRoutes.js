const express = require('express');
const router=express.Router();
const feedback = require('../controllers/feedbackController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new feedback
router.post('/feedback',feedback.createfeedback);
//get all feedback
router.get('/feedback',feedback.getAllfeedback);
//update feedback
router.put('/feedback/:feedbackID',feedback.updatefeedback);
//delete feedback
router.delete('/feedback/:feedbackID',feedback.deletefeedback);
// create login for feedback
router.post('/loginFeedback',feedback.logInFeedback);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
