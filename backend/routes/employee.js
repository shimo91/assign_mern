const express = require('express');
const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}))

const EmpData=require('../model/EmployeeData');

router.get('/getEmp',async(req,res)=>{
    try {
        const data = await EmpData.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/addEmp',async(req,res)=>{
    try {
        var item=req.body;
        const Data = new EmpData(item);
        const saveData= await Data.save();
        res.status(200).send('Saved Successfully');
    } catch (error) {
        res.status(400).send('Error!!')
    }
})

router.put('/update/:id',async(req,res)=>{
    try {
        var item=req.body;
        console.log("item for update"+item);
       const data= await EmpData.findByIdAndUpdate(req.params.id,item);
        res.status(200).send('Updated successfully');
    } catch (error) {
        res.status(404).send('Update not working');
    }
})


router.delete('/remove/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const savedata= await EmpData.findByIdAndDelete(id);
        res.status(200).send('Deleted Successfully')
    } catch (error) {
        res.status(404).send('Error!!');
    }
})

module.exports=router;