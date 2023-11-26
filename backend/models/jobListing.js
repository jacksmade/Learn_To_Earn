const mongoose=require('mongoose');
const jobSchema=new mongoose.Schema({
    jobID:String,
    title:String,
    description:String,
    requirements:String,
    payment:Number,
},{timestamps:true});
module.exports=mongoose.model('Job_listing',jobSchema);