const mongoose = require('mongoose');
const userSchema=mongoose.Schema({
    username:String,
    password:String,
})
const UserData=mongoose.model('userlist',userSchema);
module.exports=UserData;