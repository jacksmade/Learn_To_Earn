const express = require('express');
const router=express.Router();
const jobListing = require('../controllers/jobListingController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new user
router.post('/jobListing',jobListing.createJobListing);
//get all user
router.get('/jobListing',jobListing.getAllJobListing);
//update user
router.put('/jobListing/:jobID',jobListing.updateJobListing);
//delete user
router.delete('/jobListing/:jobID',jobListing.deleteJobListing);
// create login
router.post('/loginJobListing',jobListing.logInJobListing);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
