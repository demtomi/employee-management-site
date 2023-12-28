import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading";


const Superheroes = () => {
  const { search } = useParams();
  console.log(search);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  
  const fetchEmployees = (search) => {
    return fetch(`/api/employees/${search}`).then((res) => res.json());
  };
  
  useEffect(() => {
    fetchEmployees(search)
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
        console.log("BY NAME: ",employees);
      })
  }, [search]);

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
