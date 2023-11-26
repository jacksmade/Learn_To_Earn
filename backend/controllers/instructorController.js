
const instructor = require('../models/instructor');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
// create user
async function createInstructor(req,res){
    try {
        const instructor = await instructor.create(req.body);
        res.status(201).json(instructor);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

// LOGIN

async function logInInstructor (req, res, next) {
    const { username, password } = req.params;    
    try {  
            const instructor = await instructor.findOne({ username });  
            if (!instructor) return res.status(404).json({ error: 'User not found' });  
            if (user.password!=password) return res.status(401).json({ error: 'Invalid credentials' }); 
            let token = generteLoginToken(feedback); 
            return res.status(200).json({ 
            message: 'Logged in successfully', 
            educatorID:instructor.educatorID,
            earningProfiles:instructor.listIndexes(user),
            token: token, 
            }); 
    } catch (err) { 
            return res.status(500).json({ message: err.message }); 
    }  
};


// get token

function generteLoginToken(instructor) {
    const payload = { 
            educatorID:instructor.educatorID,
    }; 
    const token = jwt.sign(payload, "kjsduiewogtrre"); 
    return token;
};
// update user
async function updateInstructor(req,res){
    try {
        const {educatorID}=req.params;
        const updateInstructor = await instructor.findByIdAndUpdate(educatorID,req.body,{new:true});
        res.json(updateInstructor);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}
// delete user
async function deleteInstructor(req,res){
    try {
        const {educatorID}=req.params;
        await instructor.findByIdAndUpdate(educatorID);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}


//get all user
async function getAllInstructor(req,res){
    try{
        const instructors=await instructor.find();
        res.json(instructors);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

module.exports={
    createInstructor,
    updateInstructor,
    deleteInstructor,
    logInInstructor,
    getAllInstructor,
};