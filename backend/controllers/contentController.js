
const content = require('../models/content');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
// create user
async function createContent(req,res){
    try {
        const content = await content.create(req.body);
        res.status(201).json(content);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

// LOGIN

async function logInContent (req, res, next) {
    const { username, password } = req.params;    
    try {  
            const content = await content.findOne({ username });  
            if (!content) return res.status(404).json({ error: 'User not found' });  
            if (user.password!=password) return res.status(401).json({ error: 'Invalid credentials' }); 
            let token = generteLoginToken(content); 
            return res.status(200).json({ 
            message: 'Logged in successfully', 
            contentId: content.contentId, 
            type: content.type,          
            difficulty: content.difficulty ,   
            subject: content.subject , 
            token: token, 
            }); 
    } catch (err) { 
            return res.status(500).json({ message: err.message }); 
    }  
};


// get token

function generteLoginToken(content) {
    const payload = { 
            contentId:content.contentId,
    }; 
    const token = jwt.sign(payload, "kjsduiewogtrre"); 
    return token;
};
// update user
async function updateContent(req,res){
    try {
        const {contentId}=req.params;
        const updateContent = await content.findByIdAndUpdate(contentId,req.body,{new:true});
        res.json(updateContent);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}
// delete user
async function deleteContent(req,res){
    try {
        const {contentId}=req.params;
        await content.findByIdAndUpdate(contentId);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}


//get all user
async function getAllContent(req,res){
    try{
        const contents=await content.find();
        res.json(contents);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

module.exports={
    createContent,
    updateContent,
    deleteContent,
    logInContent,
    getAllContent,
};