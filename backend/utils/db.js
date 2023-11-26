const mongoose=require('mongoose');
mongoose.set('strictQuery',true);
mongoose.connect('mongodb://127.0.0.1:27017/credential-apis',{
    useNewUrlParser:true,
    useUnifiedTopology:true,

});

// connect with mongoDB
const db=mongoose.connection;
db.on('error',(err)=>{
    console.log('Failed to connect with db');
});
db.once('open',()=>{
    console.log('connect with db');
});
