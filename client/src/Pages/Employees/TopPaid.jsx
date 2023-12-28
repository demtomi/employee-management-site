import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";

const fetchEmployees = () => {
  return fetch("/api/employees/toppaid").then((res) => res.json());
};

const TopPaid = () => {
  const [loading, setLoading] = useState(true);
  const [topPaid, setTopPaid] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees()
      .then((data) => {
        const top3 = [data[0], data[1], data[2]];
        setTopPaid(top3);
        console.log("TOP_PAID #: ", top3);
        setLoading(false);
      })
  }, [loading]);

  if (loading) {
    return <Loading />;
  };

  return (<div className="EmployeeTable">
    <table>
      <thead>
        <tr>
        </tr>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Present</th>
        </tr>
      </thead>
      <tbody>
        {topPaid.map((top) => (
          <tr key={top._id}>
            <td>{top.name}</td>
            <td>{top.salary}</td>
            <td>{top.level}</td>
            <td>{top.position}</td>
            <td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={() => navigate('/')}>Back</button>
  </div>
  );
};

export default TopPaid;

