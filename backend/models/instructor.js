const mongoose=require('mongoose');
const { listIndexes, listenerCount } = require('./certificate');
const user = require('./user');
const instructorSchema=new mongoose.Schema({
    educatorID:String,
    earningProfiles:listIndexes(user),
},{timestamps:true});
module.exports=mongoose.model('Instructor',instructorSchema);