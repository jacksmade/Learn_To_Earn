const mongoose=require('mongoose');
const moduleSchema=new mongoose.Schema({
    moduleID:String,
    title:String,
    content:String,
    vedioURL:String,
    quiz:String,
},{timestamps:true});
module.exports=mongoose.model('Module',moduleSchema);