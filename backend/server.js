const express = require('express');

// link the routes of the project credentilas
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


//API's for routes
app.use('/api',adminRoutes);
app.use('/api',certificateRoutes);
app.use('/api',contentRoutes);
app.use('/api',feedbackRoutes);
app.use('/api',instructorRoutes);
app.use('/api',jobListingRoutes);
app.use('/api',learningModuleRoutes);
app.use('/api',mentorshipRoutes);
app.use('/api',transactionRoutes);
app.use('/api',userRoutes);

app.listen(port,()=>{
    console.log('Server is listening on port ${port}');
});



