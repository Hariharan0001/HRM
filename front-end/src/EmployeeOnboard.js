import React from "react";
import "./EmployeeOnboard.css";
export default function EmployeeOnboard() {
  return (
    <div>
      <div className="employee-onboard-page">
        <div className="onboard-form-container">
          <h2>Employee Onboard</h2>
          <form className="onboard-form">
            <input type="email" placeholder="Enter Employee Email" />
            <button type="submit">Onboard Employee</button>
          </form>
        </div>
      </div>
         
    </div>
  );
}
