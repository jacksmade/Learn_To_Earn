const mongoose=require('mongoose');
const studentSchema=new mongoose.Schema({
    transactionID:String,
    name:String,
    description:String,
    price:Number,
},{timestamps:true});
module.exports=mongoose.model('Student',studentSchema);