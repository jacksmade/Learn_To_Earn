
const learningModule = require('../models/learningModule');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
// create user
async function createLearningModule(req,res){
    try {
        const learningModule = await learningModule.create(req.body);
        res.status(201).json(learningModule);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

// LOGIN

async function logInLearningModule (req, res, next) {
    const { username, password } = req.params;    
    try {  
            const learningModule = await learningModule.findOne({ username });  
            if (!learningModule) return res.status(404).json({ error: 'User not found' });  
            if (user.password!=password) return res.status(401).json({ error: 'Invalid credentials' }); 
            let token = generteLoginToken(learningModule); 
            return res.status(200).json({ 
            message: 'Logged in successfully', 
            moduleID:learningModule.moduleID,
            title:learningModule.title,
            content:learningModule.content,
            vedioURL:learningModule.vedioURL,
            quiz:learningModule.quiz,
            token: token, 
            }); 
    } catch (err) { 
            return res.status(500).json({ message: err.message }); 
    }  
};


// get token

function generteLoginToken(learningModule) {
    const payload = { 
            moduleID:learningModule.moduleID,
    }; 
    const token = jwt.sign(payload, "kjsduiewogtrre"); 
    return token;
};
// update user
async function updateLearningModule(req,res){
    try {
        const {moduleID}=req.params;
        const updateLearningModule = await learningModule.findByIdAndUpdate(moduleID,req.body,{new:true});
        res.json(updateLearningModule);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}
// delete user
async function deleteLearningModule(req,res){
    try {
        const {moduleID}=req.params;
        await learningModule.findByIdAndUpdate(moduleID);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}


//get all user
async function getAllLearningModule(req,res){
    try{
        const learningModules=await learningModule.find();
        res.json(learningModules);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

module.exports={
    createLearningModule,
    updateLearningModule,
    deleteLearningModule,
    logInLearningModule,
    getAllLearningModule,
};