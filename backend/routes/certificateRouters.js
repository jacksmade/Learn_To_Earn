const express = require('express');
const router=express.Router();
const certificate = require('../controllers/certificateController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new certificate
router.post('/certificate',certificate.createCertificate);
//get all certificate
router.get('/certificate',certificate.getAllCertificate);
//update certificate
router.put('/certificate/:certificateID',certificate.updateCertificate);
//delete certificate
router.delete('/certificate/:certificateID',certificate.deleteCertificate);
// create login for certificate
router.post('/loginCertificate',certificate.Find);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
