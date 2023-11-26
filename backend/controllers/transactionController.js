
const admin = require('../models/admin');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const transaction = require('../models/transaction');
// create user
async function createTransaction(req,res){
    try {
        const transaction = await transaction.create(req.body);
        res.status(201).json(transaction);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

// LOGIN

async function logInTransaction (req, res, next) {
    const { username, password } = req.params;    
    try {  
            const transaction = await transaction.findOne({ username });  
            if (!transaction) return res.status(404).json({ error: 'User not found' });  
            if (user.password!=password) return res.status(401).json({ error: 'Invalid credentials' }); 
            let token = generteLoginToken(transaction); 
            return res.status(200).json({ 
            message: 'Logged in successfully', 
            transactionID:transaction.transactionID,
            name:transaction.name,
            description:transaction.description,
            price:transaction.price,
            token: token, 
            }); 
    } catch (err) { 
            return res.status(500).json({ message: err.message }); 
    }  
};


// get token

function generteLoginToken(transaction) {
    const payload = { 
            transactionID: transaction.transactionID,
    }; 
    const token = jwt.sign(payload, "kjsduiewogtrre"); 
    return token;
};
// update user
async function updateTransaction(req,res){
    try {
        const {transactionID}=req.params;
        const updateTransaction = await transaction.findByIdAndUpdate(transactionID,req.body,{new:true});
        res.json(updateTransaction);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}
// delete user
async function deleteTransaction(req,res){
    try {
        const {transactionID}=req.params;
        await transaction.findByIdAndUpdate(transactionID);
        res.sendStatus(204);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}


//get all user
async function getAllTransaction(req,res){
    try{
        const transactions=await transaction.find();
        res.json(transactions);
    } catch(err) {
        res.status(500).json({error:err.message});
    }
}

module.exports={
    createTransaction,
    updateTransaction,
    deleteTransaction,
    logInTransaction,
    getAllTransaction,
};