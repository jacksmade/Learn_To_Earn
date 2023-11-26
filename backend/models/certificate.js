const mongoose=require('mongoose');
const user = require('./user');
const certificateSchema=new mongoose.Schema({
    certificateID:String,
    title:String,
    User:user,
},{timestamps:true});
module.exports=mongoose.model('Certificate',certificateSchema);