import React, { useState } from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { deepOrange } from '@mui/material/colors';
import '../css/Login.css' 
import axios from 'axios';
const Login = () => {

    
    const [user,setUser]= useState();
    const navigate = useNavigate();
    const inputHandler= (e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const addHandler=()=>{
        axios.post('https://employee-mern-back-app.onrender.com/user/login',user).then((res)=>{
            alert(res.data.message);
            if(res.data.message=='success')
            {
                
                sessionStorage.setItem("userToken",res.data.token);
                navigate("/list")  
                
            }
            else{
                alert("Invalid");
            }
            })
            .catch(()=>{
                console.log('Error!! No connection');
                alert('Invalid');
            })
       
        
    }


  return (
    <Grid container item xs={12} direction="row"  justifyContent="center"  alignItems="center"  className='loginbody'>
        <Box component="form"  sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },   }}  noValidate   autoComplete="off" spacing={4} direction="row" alignItems="center" >
            <Grid container  className='loginContainer' >
                <Grid container item xs={12} direction="row"  justifyContent="center"  alignItems="center" >
                    <Typography variant='h3' style={{color:"orangered"}} alignItems="center">
                        Login
                    </Typography>
                </Grid>
                <Grid container item xs={12} direction="row"  justifyContent="center"  alignItems="center" >
                    <TextField required id="outlined-required" label="username" name='username' onChange={inputHandler}/>
                </Grid>
                <Grid container item xs={12} direction="row"  justifyContent="center"  alignItems="center">
                    <TextField required id="outlined-required" type='password' label="password" name='password' onChange={inputHandler}/>
                </Grid>
                <Grid container item xs={12} direction="row"  justifyContent="center"  alignItems="center">
                    <Button variant='contained'  onClick={addHandler}>Login</Button>
                </Grid>
                
            </Grid>
        </Box>
    </Grid>
      
    
  )
}

export default Login
