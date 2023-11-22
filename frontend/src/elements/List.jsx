import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, createTheme } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import '../css/Main.css'
import { useNavigate } from 'react-router-dom';
import Employee from './Employee';
import axiosInstance from '../ui-components/axiosinterceptor';
import { jwtDecode } from "jwt-decode";

const rowsColor = deepOrange[50];
const headerColor= deepOrange[300];




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    /*backgroundColor: theme.palette.warning.main,*/
    backgroundColor:headerColor,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  textAlign:'center'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
   /*backgroundColor: theme.palette.action.hover,*/
   backgroundColor: rowsColor,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const List = () => {

  console.log()

  const token = sessionStorage.getItem("userToken");
  console.log("token is :"+token);
  const decodeToken =jwtDecode(token);
  //console.log("decode"+decodeToken.username);
  const loginedUser=decodeToken.username
  console.log("username : "+loginedUser)




  var[update,setUpdate] = useState(false);
  var[singleValue,setSingleValue]=useState([]);

    const [employee,setemployee]=useState([]);

  useEffect(()=>{

    axiosInstance.get('http://127.0.0.1:5000/employee/getEmp').then((res)=>{
      setemployee(...employee,res.data);
      console.log(employee);
    })
  },[]);

  const removeHandler = (id)=>{
    //alert(id);
    var result = window.confirm("You want to delete?");
    if (result) {
      console.log(id);
      axiosInstance.delete('http://127.0.0.1:5000/employee/remove/'+id).then((res)=>{
        alert(res.data);
       window.location.reload(true);
        
      })
    }
    
  }

  const updateHandler = (val)=>{
    console.log("update clicked",val);
    setUpdate(true);
    setSingleValue(val)
  }


  
  let finalJSX=(
    <Container maxWidth="lg" sx={{ marginTop:'3vh'}} className='employeelist'>
            <TableContainer component={Paper} sx={{ maxHeight: 545 }}>
            <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
            <caption><h3>Employee List</h3></caption>
                <TableHead >
                <TableRow >
                    <StyledTableCell >S.No</StyledTableCell>
                    <StyledTableCell align="right">Name</StyledTableCell>
                    <StyledTableCell align="right">Designation</StyledTableCell>
                    <StyledTableCell align="right">Location</StyledTableCell>
                    <StyledTableCell align="right">Salary</StyledTableCell>
                    
                    {loginedUser==='admin' ? (
                        <StyledTableCell align="right">Action</StyledTableCell>
                      ) : (
                        ''
                      )}
                </TableRow>
                </TableHead>
                <TableBody>
                {employee.map((row,i) => (
                    <StyledTableRow >
                      <StyledTableCell component="th" scope="row">{i+1}</StyledTableCell>
                      <StyledTableCell align="right">{row.name}</StyledTableCell>
                      <StyledTableCell align="right">{row.designation}</StyledTableCell>
                      <StyledTableCell align="right">{row.location}</StyledTableCell>
                      <StyledTableCell align="right">{row.salary}</StyledTableCell>
                      {loginedUser==='admin' ? (
                      <StyledTableCell align="right">
                        <Button color='primary' variant='contained' onClick={()=>{updateHandler(row)}}>Edit</Button>
                        <Button color='error' variant='contained' sx={{marginLeft:'10px'}} onClick={()=>{removeHandler(row._id)}}>Delete</Button>
                      </StyledTableCell> 
                      ) : (
                        ''
                      )}
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
    </Container>
 )
 if(update) finalJSX=<Employee method="put" data={singleValue}/>
 return (
  
    
     finalJSX
     
   
    )
      
}

export default List
