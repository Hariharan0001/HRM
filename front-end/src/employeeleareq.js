import React, { useState, useEffect } from "react";
import axios from "axios";

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Access token not found.');
            return;
        }
      const response = await axios.get("http://127.0.0.1:5000/leavereq", {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
      setLeaveRequests(response.data,console.log(leaveRequests));
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:5000/approve/${id}`, { status: true},{headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      } });
      fetchLeaveRequests();
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:5000/approve/${id}`, { status: false},{headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      } });
      fetchLeaveRequests();
    } catch (error) {
      console.error("Error rejecting leave request:", error);
    }
  };

  return (
    <div className="container">
      <h2>Leave Requests</h2>
      {/* <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Reason</th>
            <th>Employee ID</th>
            <th>No. of Days</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.Reason}</td>
              <td>{request.empid}</td>
              <td>{request.noofdays}</td>
              <td>{request.status ? "Approved" : "Pending"}</td>
              <td>
                {request.status === false && (
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleApprove(request.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(request.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {/* <table className="table table-striped text-center">
      <thead className="table-dark">
        <tr>
          <th>Employee ID</th>
          <th>No. of Days</th>
          <th>Reason</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {leaveRequests.map((request) => (
          <tr key={request.id}>
            <td>{request.empid}</td>
            <td>{request.noofdays}</td>
            <td>{request.Reason}</td>
            <td>{request.status ? "Approved" : "Pending"}</td>
            <td>
              {request.status === false && (
                <>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleApprove(request.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleReject(request.id)}
                  >
                    Reject
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table> */}
    <table className="table table-striped table-bordered table-hover text-center my-4">
      <thead className="table-dark">
        <tr>
          <th>Employee ID</th>
          <th>No. of Days</th>
          <th>Reason</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {leaveRequests.map((request) => (
          <tr key={request.id}>
            <td>{request.empid}</td>
            <td>{request.noofdays}</td>
            <td>{request.Reason}</td>
            <td>{request.status ? "Approved" : "Pending"}</td>
            <td>
              {request.status === false && (
                <>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleApprove(request.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleReject(request.id)}
                  >
                    Reject
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default LeaveRequests;
