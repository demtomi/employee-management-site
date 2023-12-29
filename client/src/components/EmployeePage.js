import React from 'react';
import { useState, useEffect } from 'react';
import EmployeeTable from './EmployeeTable'

const EmployeePage = () => {

    const [employees, setEmployees] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/employees")
            .then(res => res.json())
            .then(data => {
                setEmployees(data)
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, [employees])

    function renderPage() {
        if (!loading) {
            return (
                <div>
                    <EmployeeTable employees={employees} />
                </div>
            );
        }

        return (
            <div>
                <h1>Please wait, employees table is loading...</h1>
            </div>
        );
    }

    //RETURN
    return <div className='App'>{renderPage()}</div>
};

export default EmployeePage;
