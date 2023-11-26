const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    userID:String,
    username:String,
    password:String,
    role:String,
    education:String,
    goals:String,
},{timestamps:true});
module.exports=mongoose.model('User',userSchema);