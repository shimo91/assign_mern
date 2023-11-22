import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export const RequireAdminAuth = ({children})=>{
    
    const getToken=sessionStorage.getItem('userToken');
    const decodeToken =jwtDecode(getToken);
    const loginedUser=decodeToken.username
    //console.log('token: '+getToken);
    const location=useLocation();
    if(!getToken)
    {
        return <Navigate to='/' state={{from:location}}/>
    }
    else if(loginedUser!='admin')
    {
        return <Navigate to='/' state={{from:location}}/>
    }
    return children;
}