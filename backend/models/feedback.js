const mongoose=require('mongoose');
const user = require('./user');
const feedbackSchema=new mongoose.Schema({
    feedbackID:String,
    content:String,
    rating:Number,
    User:user,
},{timestamps:true});
module.exports=mongoose.model('Feedback',feedbackSchema);