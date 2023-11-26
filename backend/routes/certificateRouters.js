const express = require('express');
const router=express.Router();
const certificate = require('../controllers/certificateController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new user
router.post('/certificate',certificate.createCertificate);
//get all user
router.get('/certificate',certificate.getAllCertificate);
//update user
router.put('/certificate/:certificateID',certificate.updateCertificate);
//delete user
router.delete('/certificate/:certificateID',certificate.deleteCertificate);
// create login
router.post('/loginCertificate',certificate.Find);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
