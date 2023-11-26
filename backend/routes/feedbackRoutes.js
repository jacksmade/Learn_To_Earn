const express = require('express');
const router=express.Router();
const feedback = require('../controllers/feedbackController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new user
router.post('/feedback',feedback.createfeedback);
//get all user
router.get('/feedback',feedback.getAllfeedback);
//update user
router.put('/feedback/:feedbackID',feedback.updatefeedback);
//delete user
router.delete('/feedback/:feedbackID',feedback.deletefeedback);
// create login
router.post('/loginFeedback',feedback.logInFeedback);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
