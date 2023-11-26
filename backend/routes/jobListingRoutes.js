const express = require('express');
const router=express.Router();
const jobListing = require('../controllers/jobListingController');
const admin = require('../controllers/adminController');
const {validateToken} = require('../utils/authorizationMiddleware');
const {requireRoles} = require('../utils/authorizationMiddleware');
//new job listing
router.post('/jobListing',jobListing.createJobListing);
//get all job listing
router.get('/jobListing',jobListing.getAllJobListing);
//update job listing
router.put('/jobListing/:jobID',jobListing.updateJobListing);
//delete job listing
router.delete('/jobListing/:jobID',jobListing.deleteJobListing);
// create login for job listing
router.post('/loginJobListing',jobListing.logInJobListing);
router.post('/admin',validateToken,admin.adminDashboard);

module.exports=router;
