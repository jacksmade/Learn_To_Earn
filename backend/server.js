const express = require('express');
const credentialRoutes=require('./routes/credentialRoutes');
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



