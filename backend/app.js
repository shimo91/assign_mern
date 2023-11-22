const express = require('express');
const app = new express();

const morgan= require('morgan');
app.use(morgan('dev'));

require('dotenv').config();

const cors =require('cors');
app.use(cors());

require('./db/connect');

const routerFile = require('./routes/employee');
app.use('/employee',routerFile);

const routeruserFile = require('./routes/user');
app.use('/user',routeruserFile);

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
})






