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
                    <tr >
                        <td key={employee.id}>{employee.full_name}</td>
                        <td key={employee.id}>{employee.age}</td>
                        <td key={employee.id}>{employee.main_office}</td>
                        <td key={employee.id}>{employee.position}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeTable;
