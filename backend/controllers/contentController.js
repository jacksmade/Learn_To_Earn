
const content = require('../models/content');// content credentials
const user = require('../models/user');// user credentials
const jwt = require('jsonwebtoken');
// create content of any subject and any topic
async function createContent(req,res){
    try {
        const content = await content.create(req.body);
        res.status(201).json(content);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

// LOGIN to find the specific content to read

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
// update content in the base of current situation 
async function updateContent(req,res){
    try {
        const {contentId}=req.params;
        const updateContent = await content.findByIdAndUpdate(contentId,req.body,{new:true});
        res.json(updateContent);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}
// delete content if the most ranking student didn't used or complain
async function deleteContent(req,res){
    try {
        const {contentId}=req.params;
        await content.findByIdAndUpdate(contentId);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}


//get all content to specify the field or type 
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