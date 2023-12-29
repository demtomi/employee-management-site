// EmployeeTable.js
import React from 'react';

const EmployeeTable = ({ employees }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Age</th>
                    <th>Main Office</th>
                    <th>Position</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.fullName}</td>
                        <td>{employee.age}</td>
                        <td>{employee.mainOffice}</td>
                        <td>{employee.position}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeTable;
