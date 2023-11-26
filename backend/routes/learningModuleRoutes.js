const express = require('express');
const router=express.Router();
const learningModule = require('../controllers/learningModuleController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new learning module
router.post('/learningModule',learningModule.createLearningModule);
//get all learning module
router.get('/learningModule',learningModule.getAllLearningModule);
//update learning module
router.put('/learningModule/:moduleID',learningModule.updateLearningModule);
//delete learning module
router.delete('/learningModule/:moduleID',learningModule.deleteLearningModule);
// create login for learning module
router.post('/loginLearningModule',learningModule.logInLearningModule);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
