import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import '../css/Employee.css'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../ui-components/axiosinterceptor';

const Employee = (props) => {

  console.log("props:  " +props);

  const navigate = useNavigate();
  const [emp,setEmp] = useState({
    name:props.data?props.data.name:'',
    designation:props.data?props.data.designation:'',
    location:props.data?props.data.location:'',
    salary:props.data?props.data.salary:'',
  });

  const inputHandler = (e)=>{
    setEmp({...emp,[e.target.name]:e.target.value});
  }


  const addHandler = ()=>{
    console.log('clicked addHandler');

    if(props.method==="put"){
      console.log("id is :"+props.data._id)
      axiosInstance.put("https://employee-mern-back-app.onrender.com/employee/update/"+props.data._id,emp)
      .then((response)=>{
       
        if (response.data==="Updated successfully") {
         alert(response.data)
          window.location.reload(false);
    
          
        } else {
          alert("not updated")
        }
      })
    }
    else
    {

      axiosInstance.post('https://employee-mern-back-app.onrender.com/employee/addEmp',emp).then((res)=>{
        alert(res.data);
        navigate("/list")
      })
    }

  }

  
  return (
  
    <Grid container item xs={12} direction="row"  justifyContent="center"  alignItems="center" sx={{ marginTop:'3vh'}} >
      <Box
      component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
      noValidate
       spacing={4} direction="row" alignItems="center"
    >
      <Grid container  className='formContainer' >
      <Grid item xs={12} >
      
        <Typography variant="h4" component="h3" sx={{textAlign:'center', color:'orangered'}}>
          Employee Form
        </Typography>
      </Grid>
      <Grid container item xs={12} direction="row"  justifyContent="center"  alignItems="center" >
        <TextField
          id="outlined-basic"
          label='Name'
          name='name'          
          onChange={inputHandler}
          value={emp.name}
          
        />
        <TextField
          id="outlined-basic"
          label='Designation'
          name='designation'
          onChange={inputHandler}
          value={emp.designation}
        />
        </Grid>
      <Grid container item xs={12} direction="row"  justifyContent="center"  alignItems="center">
      <TextField
          id="outlined-basic"
          label='Location'
          name='location'
          onChange={inputHandler}
          value={emp.location}
        />
        <TextField
          id="outlined-basic"
          label='Salary'
          name='salary'
          onChange={inputHandler}
          value={emp.salary}
        />
        
        </Grid>
        <Grid container item xs={12} direction="row"  justifyContent="center"  alignItems="center">
          <Button variant="contained" color="secondary" onClick={addHandler}>
            Submit
          </Button>
        </Grid>
        </Grid>
        
    </Box>
    </Grid>
  )
 
}

export default Employee
