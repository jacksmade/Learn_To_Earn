
const jobListing = require('../models/jobListing');// jobListing credentials
const user = require('../models/user');// user credentials
const jwt = require('jsonwebtoken');
// create the job opportunity
async function createJobListing(req,res){
    try {
        const jobListing = await jobListing.create(req.body);
        res.status(201).json(jobListing);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

// LOGIN account to saw the job listing

async function logInJobListing (req, res, next) {
    const { username, password } = req.params;    
    try {  
            const jobListing = await jobListing.findOne({ username });  
            if (!jobListing) return res.status(404).json({ error: 'User not found' });  
            if (user.password!=password) return res.status(401).json({ error: 'Invalid credentials' }); 
            let token = generteLoginToken(jobListing); 
            return res.status(200).json({ 
            message: 'Logged in successfully', 
            jobID:jobListing.jobID,
            title:jobListing.title,
            description:jobListing.description,
            requirements:jobListing.requirements,
            payment:jobListing.payment,
            token: token, 
            }); 
    } catch (err) { 
            return res.status(500).json({ message: err.message }); 
    }  
};


// get token

function generteLoginToken(jobListing) {
    const payload = { 
            jobID:jobListing.jobID,
    }; 
    const token = jwt.sign(payload, "kjsduiewogtrre"); 
    return token;
};
// update the job opportunity requirements
async function updateJobListing(req,res){
    try {
        const {jobID}=req.params;
        const updateJobListing = await jobListing.findByIdAndUpdate(jobID,req.body,{new:true});
        res.json(updateJobListing);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}
// delete the job listing the the admin want
async function deleteJobListing(req,res){
    try {
        const {jobID}=req.params;
        await jobListing.findByIdAndUpdate(jobID);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}


//saw all job listing and opportunity
async function getAllJobListing(req,res){
    try{
        const jobListings=await jobListing.find();
        res.json(jobListings);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

module.exports={
    createJobListing,
    updateJobListing,
    deleteJobListing,
    logInJobListing,
    getAllJobListing,
};