const express = require('express');
const router=express.Router();
const learningModule = require('../controllers/learningModuleController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new user
router.post('/learningModule',learningModule.createLearningModule);
//get all user
router.get('/learningModule',learningModule.getAllLearningModule);
//update user
router.put('/learningModule/:moduleID',learningModule.updateLearningModule);
//delete user
router.delete('/learningModule/:moduleID',learningModule.deleteLearningModule);
// create login
router.post('/loginLearningModule',learningModule.logInLearningModule);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
