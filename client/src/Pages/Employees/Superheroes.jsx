import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";

const fetchEmployees = () => {
  return fetch("/api/employees/superheroes").then((res) => res.json());
};

const Superheroes = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
        console.log("SUPERHEROES: ",employees);
      })
  }, []);

  if (loading) {
    return <Loading />;
  };

  return (<div className="EmployeeTable">
    <table>
      <thead>
        <tr>
        </tr>
        <tr>
          <th>Name
          </th>
          <th>Level
          </th>
          <th>Position
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Superheroes;

