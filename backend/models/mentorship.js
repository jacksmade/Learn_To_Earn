const mongoose=require('mongoose');
const user = require('./user');
const mentorSchema=new mongoose.Schema({
    mentorID:String,
    students:listIndexes(user),
},{timestamps:true});
module.exports=mongoose.model('Mentor',mentorSchema);