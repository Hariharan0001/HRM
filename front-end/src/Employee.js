// import React, { useState } from "react";
// import "./Emp.css";

// export default function Employee({ onLogin }) {
//   const [employeeID, setEmployeeID] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     let role="emp"
//     onLogin({ employeeID, password,role });
//   };

//   return (
//     <div>
//       <div className="employee-login-page">
//         <div className="login-form-container">
//           <h2>Employee Login</h2>
//           <form className="login-form" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               placeholder="Employee ID"
//               value={employeeID}
//               onChange={(e) => setEmployeeID(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="submit">Login</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import "./Emp.css";

export default function Employee({ onLogin }) {
  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let role="emp"
    onLogin({ employeeID, password, role });
  };

  return (
    <div>
      <div className="employee-login-page">
        <div className="login-form-container">
          <h2>Employee Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Employee ID"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

