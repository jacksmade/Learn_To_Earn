const express = require('express');
const router=express.Router();
const content = require('../controllers/contentController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new content
router.post('/content',content.createContent);
//get all content
router.get('/content',content.getAllContent);
//update content
router.put('/content/:contentID',content.updateContent);
//delete content
router.delete('/content/:contentID',content.deleteContent);
// create login for content
router.post('/loginContent',content.logInContent);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
