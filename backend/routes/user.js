const express = require('express');
const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}))

const userData=require('../model/UserData');
const cors = require('cors');
router.use(cors());
const jwt= require('jsonwebtoken');


function verifytoken(req,res,next){
    try {
        const token = req.headers.token;
        if(!token) throw 'Unauthorized';
        let payload=jwt.verify(token,'reactempapp');
        if(!payload) throw 'Unauthorized';
        //res.status(200).send(payload);
        next();
    } catch (error) {
        res.status(401).send('Error')
    }
}

router.post('/login',async(req,res)=>
{
    try {
       
        const username = req.body.username;
        const password = req.body.password;
        console.log(username,password);
        const foundUser = await userData.findOne({ username, password });
        let token;
        let payload;
        console.log("found :"+foundUser)
        if(foundUser !== null ) {
            console.log("foundusername : "+foundUser.username)
            if(foundUser.username==='admin')
            {
                console.log("inside admin");
                payload={username:username,password:password}
                token=jwt.sign(payload,'reactempadminapp');
            }
            else
            {
                payload={username:username,password:password}
                token=jwt.sign(payload,'reactempuserapp');
            }
            
              res.status(200).send({message:'success',token:token});
          } else {
            console.log("inside else")
              // res.status(401).send('Invalid credentials');
              res.status(400).send({massage:'Unauthorized'})
              console.log("after else")
          }
    } catch (error) {
        res.status(400).send({massage:'error'})
    }
})

module.exports=router;