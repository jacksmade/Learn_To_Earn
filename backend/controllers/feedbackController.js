
const feedback = require('../models/feedback');// feedback credentials
const user = require('../models/user');// user credentials
const jwt = require('jsonwebtoken');
// create feedback for user 
async function createfeedback(req,res){
    try {
        const feedback = await feedback.create(req.body);
        res.status(201).json(feedback);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

// LOGIN to find the own feedback and saw other feedback as well

async function logInFeedback (req, res, next) {
    const { username, password } = req.params;    
    try {  
            const feedback = await feedback.findOne({ username });  
            if (!feedback) return res.status(404).json({ error: 'User not found' });  
            if (user.password!=password) return res.status(401).json({ error: 'Invalid credentials' }); 
            let token = generteLoginToken(feedback); 
            return res.status(200).json({ 
            message: 'Logged in successfully', 
            feedbackID:feedback.feedbackID,
            content:feedback.content, // here the content means your opinion regarding the content
            rating:feedback.rating,
            User:feedback.user.User,
            token: token, 
            }); 
    } catch (err) { 
            return res.status(500).json({ message: err.message }); 
    }  
};


// get token

function generteLoginToken(feedback) {
    const payload = { 
            feedbackID:feedback.feedbackID,
    }; 
    const token = jwt.sign(payload, "kjsduiewogtrre"); 
    return token;
};
// update your feedback
async function updatefeedback(req,res){
    try {
        const {feedbackID}=req.params;
        const updatefeedback = await feedback.findByIdAndUpdate(feedbackID,req.body,{new:true});
        res.json(updatefeedback);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}
// user can delete his/her feedback
async function deletefeedback(req,res){
    try {
        const {feedbackID}=req.params;
        await feedback.findByIdAndUpdate(feedbackID);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}


//saw all feedback on the content that you read
async function getAllfeedback(req,res){
    try{
        const feedbacks=await feedback.find();
        res.json(feedbacks);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

module.exports={
    createfeedback,
    updatefeedback,
    deletefeedback,
    logInFeedback,
    getAllfeedback,
};