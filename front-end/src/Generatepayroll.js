// import React, { useState, useEffect } from 'react';
// import axios from "axios";

// const Generatepayroll = () => {
//     const [payrollData, setPayrollData] = useState({});

//     useEffect(async() => {
//             const token = localStorage.getItem("token");
//       const response = await axios.get(
//         "http://127.0.0.1:5000/generate_payroll",
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           }})
//           setPayrollData(response.json)
//     }, []);

//     return (
//         <div className="container mt-5">
//             <h1 className="mb-4">Payroll Report</h1>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>Employee ID</th>
//                         <th>Payroll Amount</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {Object.entries(payrollData).map(([empId, amount]) => (
//                         <tr key={empId}>
//                             <td>{empId}</td>
//                             <td>{amount}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Generatepayroll;

import React, { useState, useEffect } from 'react';
import axios from "axios";

const Generatepayroll = () => {
    const [payrollData, setPayrollData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "http://127.0.0.1:5000/generate_payroll",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                setPayrollData(response.data);
            } catch (error) {
                console.error("Error fetching payroll data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container mt-5" style={{ border: '1px solid #ccc', textAlign: 'center' }}>
            <h1 className="mb-4">Payroll Report</h1>
            <div className="table-responsive">
                <table className="table" style={{ fontSize: '24px',border: '1px solid #ccc'}}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Employee ID</th>
                            <th scope="col">Payroll Amount</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: '16px' }}>
                        {Object.entries(payrollData).map(([empId, amount]) => (
                            <tr key={empId}>
                                <td>{empId}</td>
                                <td>{amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
    
    
    
    
};

export default Generatepayroll;
