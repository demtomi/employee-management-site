import { useState, useEffect } from 'react';
import React from 'react'

const MainPage = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [companyName, setCompanyName] = useState('Your Company Name');

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            setCurrentTime(`Current Time: ${now.toLocaleTimeString()}`);

            setCurrentDate(`Date: ${now.toLocaleDateString()} (${now.toLocaleDateString('en', { weekday: 'long' })})`);
        };

        setCompanyName('Codecool_Devops_LLC');
        updateDateTime();

        const intervalId = setInterval(updateDateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="main-card">
            <h1>Welcome to E&E management site</h1>
            <div id="dateTimeCard">
                <p id="currentTime">{currentTime}</p>
                <p id="currentDate">{currentDate}</p>
                <p id="companyName">{companyName}</p>
            </div>
        </div>
    );
}

export default MainPage;