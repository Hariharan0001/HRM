import React, { useState } from "react";
import "./Admin.css";
import EmployeeOnboard from "./EmployeeOnboard";
import LeaveRequests from "./employeeleareq";
import Generatepayroll from "./Generatepayroll";
export default function Admin() {
  const [leave,setleave]=useState(false)
  const [onboard,setonboard]=useState(false)
  const [payroll,setpayroll]=useState(false)
  function handleleave(){
    setleave(true)
    setonboard(false)
    setpayroll(false)
  }
  function handleonboard(){
    setleave(false)
    setonboard(true)
    setpayroll(false)
  }
  function handlepayroll(){
    setleave(false)
    setonboard(false)
    setpayroll(true)
  }
  return (
    <div>
      <div className="admin-dashboard">
        <h1>Welcome to Admin Dashboard</h1>
        <div className="button-container">
          <button className="leave-request-button" onClick={handleleave}>
            Employee Leave Request
            <span className="button-hover-effect"></span>
          </button>
          <button className="onboard-button" onClick={handleonboard}>
            Employee Onboard
            <span className="button-hover-effect"></span>
          </button>
          <button className="payroll-button" onClick={handlepayroll}>
            Generate Payroll
            <span className="button-hover-effect"></span>
          </button>
        </div>
      </div>
       {onboard && <EmployeeOnboard />}
      {leave && <LeaveRequests />}
      {payroll && <Generatepayroll />}
    </div>
  );
}
