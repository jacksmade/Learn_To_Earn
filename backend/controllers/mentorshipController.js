
const learningModule = require('../models/learningModule');
const mentorship = require('../models/mentorship');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
// create user
async function createMentorship(req,res){
    try {
        const mentorship = await mentorship.create(req.body);
        res.status(201).json(mentorship);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

// LOGIN

async function logInMentorship (req, res, next) {
    const { username, password } = req.params;    
    try {  
            const mentorship = await mentorship.findOne({ username });  
            if (!mentorship) return res.status(404).json({ error: 'User not found' });  
            if (user.password!=password) return res.status(401).json({ error: 'Invalid credentials' }); 
            let token = generteLoginToken(mentorship); 
            return res.status(200).json({ 
            message: 'Logged in successfully', 
            mentorID:mentorship.mentorID,
            students:mentorship.listIndexes(user),
            token: token, 
            }); 
    } catch (err) { 
            return res.status(500).json({ message: err.message }); 
    }  
};


// get token

function generteLoginToken(mentorship) {
    const payload = { 
            mentorID:mentorship.mentorID,
    }; 
    const token = jwt.sign(payload, "kjsduiewogtrre"); 
    return token;
};
// update user
async function updateMentorship(req,res){
    try {
        const {mentorID}=req.params;
        const updateMentorship = await mentorship.findByIdAndUpdate(mentorID,req.body,{new:true});
        res.json(updateMentorship);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}
// delete user
async function deleteMentorship(req,res){
    try {
        const {mentorID}=req.params;
        await mentorship.findByIdAndUpdate(mentorID);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}


//get all user
async function getAllMentorship(req,res){
    try{
        const mentorships=await mentorship.find();
        res.json(mentorships);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

module.exports={
    createMentorship,
    updateMentorship,
    deleteMentorship,
    logInMentorship,
    getAllMentorship,
};