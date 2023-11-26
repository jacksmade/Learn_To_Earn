
const jobListing = require('../models/jobListing');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
// create user
async function createJobListing(req,res){
    try {
        const jobListing = await jobListing.create(req.body);
        res.status(201).json(jobListing);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

// LOGIN

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
// update user
async function updateJobListing(req,res){
    try {
        const {jobID}=req.params;
        const updateJobListing = await jobListing.findByIdAndUpdate(jobID,req.body,{new:true});
        res.json(updateJobListing);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}
// delete user
async function deleteJobListing(req,res){
    try {
        const {jobID}=req.params;
        await jobListing.findByIdAndUpdate(jobID);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}


//get all user
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