import React from 'react';
import './EmployeeTable.css';

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
                        <td>{employee.full_name}</td>
                        <td>{employee.age}</td>
                        <td>{employee.main_office}</td>
                        <td>{employee.position}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeTable;
