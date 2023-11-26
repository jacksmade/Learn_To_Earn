const mongoose=require('mongoose'); // interact with mongoDB
const adminSchema=new mongoose.Schema({
    adminID:String,
    adminUsername:String,
    adminPassword:String,
},{timestamps:true});
module.exports=mongoose.model('Admin',adminSchema);