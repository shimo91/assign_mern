import { jwtDecode } from "jwt-decode";


const token = sessionStorage.getItem("userToken");
  //console.log("token is :"+token);
  const decodeToken =jwtDecode(token);
  //console.log("decode"+decodeToken.username);
  export const loginedUser=decodeToken.username
  console.log("username : "+loginedUser)

//export default loginedUser;