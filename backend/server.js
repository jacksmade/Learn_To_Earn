const express = require('express');
const adminRoutes=require('./routes/adminRoutes');
const certificateRoutes=require('./routes/certificateRouters');
const contentRoutes=require('./routes/contentRoutes');
const feedbackRoutes=require('./routes/feedbackRoutes');
const instructorRoutes=require('./routes/instructorRoutes');
const jobListingRoutes=require('./routes/jobListingRoutes');
const learningModuleRoutes=require('./routes/learningModuleRoutes');
const mentorshipRoutes=require('./routes/mentorshipRoutes');
const transactionRoutes=require('./routes/transactionRoutes');
const userRoutes=require('./routes/userRoutes');
require('./utils/db');
const jwt = require('jsonwebtoken');

const bodyParser=require('body-parser');
const app=express();
const port=3005;


//Apis
app.use('/api',credentialRoutes);

app.listen(port,()=>{
    console.log('Server is listening on port ${port}');
});



