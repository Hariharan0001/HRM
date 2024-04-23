import React, { useState } from "react";
import "./Dash.css";
import axios from "axios";
export default function Dashboard() {
  const [leave, setleave] = useState(false);
  const [noOfDays, setNoOfDays] = useState("");
  const [reason, setReason] = useState("");
  function handleattendence() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Access token not found.");
      return;
    }

    axios
      .get("http://127.0.0.1:5000/take-attendance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('http://127.0.0.1:5000/applyleave', {
      noOfDays: noOfDays,
      reason: reason
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    })
    .then(response => {
      console.log('Leave request submitted successfully:', response);
    })
    .catch(error => {
      console.error('Error submitting leave request:', error);
    });
  };
  return (
    <div>
      <div className="dashboard">
        <h1>Welcome to Your Dashboard</h1>
        <div className="button-container">
          <button
            className="leave-request-button"
            onClick={() => setleave(true)}
          >
            Leave Request
            <span className="button-hover-effect"></span>
          </button>
          <button className="take-attendance-button" onClick={handleattendence}>
            Take Attendance
            <span className="button-hover-effect"></span>
          </button>
        </div>
      </div>
      {leave && (
        <form className="leave-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="noOfDays" className="form-label">
              Number of Days:
            </label>
            <input
              type="number"
              className="form-control"
              id="noOfDays"
              value={noOfDays}
              onChange={(e) => setNoOfDays(e.target.value)}
              placeholder="Enter number of days"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason" className="form-label">
              Reason for Leave:
            </label>
            <textarea
              className="form-control"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
              placeholder="Enter reason for leave"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
