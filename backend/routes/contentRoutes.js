const express = require('express');
const router=express.Router();
const content = require('../controllers/contentController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new user
router.post('/content',content.createContent);
//get all user
router.get('/content',content.getAllContent);
//update user
router.put('/content/:contentID',content.updateContent);
//delete user
router.delete('/content/:contentID',content.deleteContent);
// create login
router.post('/loginContent',content.logInContent);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
