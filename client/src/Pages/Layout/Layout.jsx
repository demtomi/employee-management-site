import { Outlet, Link, useLocation } from "react-router-dom";

import "./Layout.css";

const Layout = () => {

  const location = useLocation();
  const isEmployeePage = location.pathname === '/';
  const isEquipmentPage = location.pathname === '/equipment';
  const isDivisionPage = location.pathname === '/divisions';

  return (
    <div className="Layout">
      <nav>
        <ul>
          <li className="grow">
            <span className="dropdown">
              <button className="dropbtn">Menu</button>
              <div className="dropdown-content">
                <Link to="/">Employees</Link>
                <Link to="/equipment">Equipment</Link>
                <Link to="/divisions">Divisions</Link>
                <Link to="/tools">Tools</Link>
                <Link to="/boardgames">Games</Link>
              </div>
            </span>
          </li>
          <li>
            {isEmployeePage && (
              <Link to="/create">
                <button type="create-button">Create Employee</button>
              </Link>
            )}
            {isEquipmentPage && (
              <Link to="/equipment/create">
                <button type="create-button">Create Equipment</button>
              </Link>
            )}
            {isDivisionPage && (
              <Link to="/divisions/create">
                <button type="create-button">Create Division</button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
