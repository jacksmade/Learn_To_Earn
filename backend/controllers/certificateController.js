
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const certificate = require('../models/certificate');
// create user
async function createCertificate(req,res){
    try {
        const certificate = await certificate.create(req.body);
        res.status(201).json(certificate);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

// LOGIN

async function Find (req, res, next) {
    const { username, password } = req.params;    
    try {  
            const certificate = await certificate.findOne({ username });  
            if (!certificate) return res.status(404).json({ error: 'User not found' });  
            if (user.password!=password) return res.status(401).json({ error: 'Invalid credentials' }); 
            let token = generteLoginToken(certificate); 
            return res.status(200).json({ 
            message: 'Logged in successfully', 
            certificateID: certificate.certificateID, 
            title: certificate.title, 
            User: certificate.user.User, 
            token: token, 
            }); 
    } catch (err) { 
            return res.status(500).json({ message: err.message }); 
    }  
};


// get token

function generteLoginToken(certificate) {
    const payload = { 
            certificateID: certificate.certificateID,
    }; 
    const token = jwt.sign(payload, "kjsduiewogtrre"); 
    return token;
};
// update user
async function updateCertificate(req,res){
    try {
        const {certificateID}=req.params;
        const updateCertificate = await certificate.findByIdAndUpdate(certificateID,req.body,{new:true});
        res.json(updateCertificate);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}
// delete user
async function deleteCertificate(req,res){
    try {
        const {certificateID}=req.params;
        await certificate.findByIdAndUpdate(certificateID);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}


//get all user
async function getAllCertificate(req,res){
    try{
        const certificates=await certificate.find();
        res.json(certificates);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

module.exports={
    createCertificate,
    updateCertificate,
    deleteCertificate,
    Find,
    getAllCertificate,
};