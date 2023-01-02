import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedEmployee = ({children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [userData] = useState(loggedInUser);
 
  const navigate = useNavigate()

  useEffect(()=>{
  
    if (!userData?.isAuthenticated && !userData?.isEmployeeAuthenticated) {
      return navigate('/')
     }
     
     if (userData?.isAuthenticated) {
       
         return navigate("/401", {state: {url:'/customer'}}) 
       
     } 
     if(userData?.user?.role !== "Employee"){
      return navigate("/401", {state: {url:'/adminpage'}}) 
     }
   })
   return children;
  };





export default ProtectedEmployee;
