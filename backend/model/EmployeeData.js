const mongoose = require('mongoose');
const empSchema=mongoose.Schema({
    name:String,
    designation:String,
    location:String,
    salary:String
})
const EmployeeData=mongoose.model('employeelist',empSchema);
module.exports=EmployeeData;