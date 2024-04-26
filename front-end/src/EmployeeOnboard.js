// import React from "react";
// import "./EmployeeOnboard.css";
// export default function EmployeeOnboard() {
//   return (
//     <div>
//       <div className="employee-onboard-page">
//         <div className="onboard-form-container">
//           <h2>Employee Onboard</h2>
//           <form className="onboard-form">
//             <input type="email" placeholder="Enter Employee Email" />
//             <input type="text" placeholder="Enter Employee UserName" />
//             <input type="text" placeholder="Enter Employee Password" />
//             <button type="submit">Onboard Employee</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import "./EmployeeOnboard.css";
export default function EmployeeOnboard() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/onboard",
        {
          email,
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // On successful response, clear the form fields or show a success message
        setEmail("");
        setUsername("");
        setPassword("");
        alert("Employee onboarded successfully!");
      } else {
        // Handle error response
        alert("Error: Unable to onboard employee");
      }
    } catch (error) {
      // Handle fetch error
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <div className="employee-onboard-page">
        <div className="onboard-form-container">
          <h2>Employee Onboard</h2>
          <form className="onboard-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Employee Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Employee Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Employee Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Onboard Employee</button>
          </form>
        </div>
      </div>
    </div>
  );
}
