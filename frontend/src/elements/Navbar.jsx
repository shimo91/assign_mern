import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const token = sessionStorage.getItem("userToken");
  //console.log("token is :"+token);
  const decodeToken =jwtDecode(token);
  //console.log("decode"+decodeToken.username);
  const loginedUser=decodeToken.username
  console.log("username : "+loginedUser)
  
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='navbar'>
        <Toolbar>
        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {loginedUser}
          </Typography>
          {loginedUser==='admin' ? (
          <Button color='inherit'><Link style={{textDecoration:'none',color:'white'}} to={'/list'}>Home</Link></Button>
          ) : ('')}
          {loginedUser==='admin' ? (
          <Button color='inherit'><Link style={{textDecoration:'none',color:'white'}} to={'/addemployee'}>Add Employee</Link></Button> 
          ) : ('')}
          
          <Button color="inherit"><Link style={{textDecoration:'none',color:'white'}} to={'/'}>Log Out</Link></Button>
          
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
