import React, { useState } from 'react';
import './App.css';
import EmployeePage from './components/EmployeePage';
import EquipmentPage from './components/EquipmentPage';
import MainPage from './components/MainPage';

function App() {
  const [selectedPage, setSelectedPage] = useState('main');

  const renderPage = () => {
    switch (selectedPage) {
      case 'employees':
        return (
          <div className="employees-page">
            <EmployeePage />
          </div>
        );

      case 'equipment':
        return (
          <div className="equipments-page">
            <EquipmentPage />
          </div>
        );

      default:
        return (
          <div className="main-page">
            < MainPage />
          </div>
        );
    }
  };

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  return (
    <div className='App'>
      <div className="dropdown">
        <button className="dropbtn">Select Page</button>
        <div className="dropdown-content">
          <button onClick={() => handlePageChange('main')}>Main Page</button>
          <button onClick={() => handlePageChange('employees')}>Employees</button>
          <button onClick={() => handlePageChange('equipment')}>Equipment</button>
        </div>
      </div>
      {renderPage()}
    </div>
  );
}

export default App;
