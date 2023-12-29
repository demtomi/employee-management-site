import React from 'react';
import EmployeeTable from './EmployeeTable'

const EmployeePage = () => {
    const employees = [
        { id: 1, fullName: 'John Doe', age: 30, mainOffice: 'New York', position: 'Developer' },
        { id: 2, fullName: 'Jane Smith', age: 25, mainOffice: 'San Francisco', position: 'Designer' },
    ];

    return (
        <div>
            <h2>Employee List</h2>
            <EmployeeTable employees={employees} />
        </div>
    );
};

export default EmployeePage;
