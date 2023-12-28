import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";

import EmployeeAddress from "./Pages/Employees/EmployeeAddress";
import EmployeeCreator from "./Pages/Employees/EmployeeCreator";
import EmployeeKittens from "./Pages/Employees/EmployeeKittens";
import EmployeeList from "./Pages/Employees/EmployeeList";
import EmployeeUpdater from "./Pages/Employees/EmployeeUpdater";
import MissingEmployees from "./Pages/Employees/MissingEmployees";
import SearchByName from "./Pages/Employees/SearchByName";
import Superheroes from "./Pages/Employees/Superheroes";
import TopPaid from "./Pages/Employees/TopPaid";

import EquipmentList from "./Pages/Equipment/EquipmentList";
import EquipmentCreator from "./Pages/Equipment/EquipmentCreator";
// import EmployeeForm from "./Components/EmployeeForm";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/name/:search",
        element: < SearchByName />,
      },
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/:id/address",
        element: < EmployeeAddress />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/superheroes",
        element: <Superheroes />,
      },
      {
        path: "/equipment",
        element: <EquipmentList />,
      },
      {
        path: "/equipment/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/equipment/create",
        element: <EquipmentCreator />,
      },
      {
        path: "/missing",
        element: < MissingEmployees />,
      },
      {
        path: "/:id/assign",
        element: < EmployeeUpdater />,
      },
      {
        path: "/top-paid",
        element: < TopPaid />,
      },
      {
        path: "/kittens/:id",
        element: < EmployeeKittens />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
