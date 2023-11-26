
const admin = require('../models/admin');
const user=require('../modules/user')
const jwt = require('jsonwebtoken');
// create user
async function createAdmin(req,res){
    try {
        const admin = await admin.create(req.body);
        res.status(201).json(admin);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

// LOGIN

async function logIn (req, res, next) {
    const { adminUsername, adminPassword } = req.params;    
    try {  
            const admin = await admin.findOne({ adminUsername });  
            if (!admin) return res.status(404).json({ error: 'User not found' });  
            if (admin.adminPassword!=adminPassword) return res.status(401).json({ error: 'Invalid credentials' }); 
            let token = generteLoginToken(admin); 
            return res.status(200).json({ 
            message: 'Logged in successfully', 
            adminID: admin.adminID, 
            adminUsername: admin.adminUsername, 
            adminPassword: admin.adminPassword, 
            token: token, 
            }); 
    } catch (err) { 
            return res.status(500).json({ message: err.message }); 
    }  
};


// get token

function generteLoginToken(admin) {
    const payload = { 
            adminID: admin.adminID,
    }; 
    const token = jwt.sign(payload, "kjsduiewogtrre"); 
    return token;
};
// update user
async function updateAdmin(req,res){
    try {
        const {adminID}=req.params;
        const updateAdmin = await admin.findByIdAndUpdate(adminID,req.body,{new:true});
        res.json(updateAdmin);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}
// delete user
async function deleteAdmin(req,res){
    try {
        const {adminID}=req.params;
        await admin.findByIdAndUpdate(adminID);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}


//get all user
async function getAllAdmin(req,res){
    try{
        const admins=await admin.find();
        res.json(admins);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

module.exports={
    createAdmin,
    updateAdmin,
    deleteAdmin,
    getAllAdmin,
    logIn,
};