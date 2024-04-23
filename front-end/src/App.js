// import React from "react";
// import { BrowserRouter as Routes, Route, Router } from "react-router-dom";
// import Loginpage from "./Loginpage";
// import Dashboard from "./Dashboard";
// // export default function App() {
// //   return (
// //     <div>
// //       <Loginpage />
// //     </div>
// //   );
// // }

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/" component={Loginpage} />
//         <Route path="/dashboard" component={Dashboard} />
//       </Routes>
//     </Router>
//   );
// }


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginpage from "./Loginpage";
import Dashboard from "./Dashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Loginpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
