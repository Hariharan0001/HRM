import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Employee from "./Employee";
import HRlogin from "./HRlogin";
import Dashboard from "./Dashboard";
import Admin from "./Admin.js";
import axios from 'axios'
export default function Loginpage() {
  const [userType, setUserType] = useState(null);
  const [hrverify,sethrverify]= useState(false);
  const [empverify,setempverify]= useState(false);
  const navigate = useNavigate();
  const handleEmployeeLogin = () => {
    setUserType("employee");
    // Add your employee login logic here
  };

  const handleHRLogin = () => {
    setUserType("hr");
    // Add your HR login logic here
  };
  const handleHRFormSubmit = (formData) => {
    // Handle HR login form submission here
    console.log("HR Form Data:", formData);
    if(userType){
      setUserType("")
    }
    if(empverify){
      setempverify(false)
    }
    if(!hrverify){
      sethrverify(true);
    }
    axios.post('http://127.0.0.1:5000/login',formData).
      then(function (response) {
        console.log(response)
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        //setempverify((pre)=>!pre)
    }).catch(function (error) {
      console.error('Login error:', error.data.response.message);
  })
  };
  const handleEmployeeformsubmit = (formData) => {
    console.log("Employee Data",formData)
    if(userType){
      setUserType("")
    }
    if(!empverify){
      setempverify(true)
    }
    if(hrverify){
      sethrverify(false);
    }
    axios.post('http://127.0.0.1:5000/login',formData).
      then(function (response) {
        console.log(response)
        const token = response.data.access_token;
        localStorage.setItem('token', token);    
        // navigate('/dashboard');
    }).catch(function (error) {
      console.error('Login error:', error.response.data.message);
  })
 //   });
  };
  return (
    <div className="login-page">
      <h1>Welcome</h1>
      {userType === null && (
        <div className="login-buttons">
          <button className="login-button" onClick={handleEmployeeLogin}>
            Employee Login
          </button>
          <button className="login-button" onClick={handleHRLogin}>
            HR Login
          </button>
        </div>
      )}
      {userType === "employee" && (
        <div>
          <h2>Employee Login Form </h2>
          <Employee onLogin={handleEmployeeformsubmit}/>
        </div>
      )}
      {userType === "hr" && (
        <div>
          <h2>HR Login Form</h2>
          <HRlogin onLogin={handleHRFormSubmit}/>
        </div>
      )}
      {hrverify && <Admin />}
      {empverify && <Dashboard />}
    </div>
  );
}