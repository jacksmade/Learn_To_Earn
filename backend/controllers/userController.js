
const user = require('../models/user'); // user credentials
const jwt = require('jsonwebtoken');
// create user
async function createUser(req,res){
    try {
        const user = await user.create(req.body);
        res.status(201).json(user);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

// LOGIN account to specify the role like student and instructor

async function login (req, res, next) {
    const { username, password } = req.params;    
    try {  
            const user = await user.findOne({ username });  
            if (!user) return res.status(404).json({ error: 'User not found' });  
            if (user.password!=password) return res.status(401).json({ error: 'Invalid credentials' }); 
            let token = generteLoginToken(user); 
            return res.status(200).json({ 
            message: 'Logged in successfully', 
            username: user.username, 
            password: user.password, 
            userID: user.userID, 
            role:user.role,
            education:user.education,
            goals:user.goals,
            token: token, 
            }); 
    } catch (err) { 
            return res.status(500).json({ message: err.message }); 
    }  
};


// get token

function generteLoginToken(user) {
    const payload = { 
            role: user.role,
            userID: user.userID,
    }; 
    const token = jwt.sign(payload, "kjsduiewogtrre"); 
    return token;
};
// update user
async function updateUser(req,res){
    try {
        const {userID}=req.params;
        const updateUser = await user.findByIdAndUpdate(userID,req.body,{new:true});
        res.json(updateUser);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}
// delete user
async function deleteUser(req,res){
    try {
        const {userID}=req.params;
        await user.findByIdAndUpdate(userID);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}


//get all user
async function getAllUser(req,res){
    try{
        const users=await user.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

module.exports={
    createUser,
    updateUser,
    deleteUser,
    getAllUser,
    login,
};