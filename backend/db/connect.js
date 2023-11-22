const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://shimonaprakash:shimictakjul23@cluster0.v21na5t.mongodb.net/employee?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to employeedb');
})
.catch(()=>{
    console.log('Error!! No connection');
})