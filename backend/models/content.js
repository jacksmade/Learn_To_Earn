const mongoose=require('mongoose');
const contentSchema=new mongoose.Schema({
    contentId: String, 
    type: String,          
    difficulty: String ,   
    subject: String ,
},{timestamps:true});
module.exports=mongoose.model('Content',contentSchema);