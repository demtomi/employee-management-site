import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";

const fetchEmployees = () => {
  return fetch("/api/employees/missing").then((res) => res.json());
};

const MissingEmployees = () => {
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState([]);

  useEffect(() => {
    fetchEmployees()
      .then((data) => {
        setLoading(false);
        setMissing(data);
        console.log("MISSING #: ", data, data.length);
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
          <th>Present
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {missing.map((person) => (
          <tr key={person._id}>
            <td>{person.name}</td>
            <td>{person.level}</td>
            <td>{person.position}</td>
            <td>{person.present.toString()}</td>
            <td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default MissingEmployees;

