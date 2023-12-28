import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import EmployeeTable from "../../Components/EmployeeTable";
import { Pagination } from "../../Components/Pagination/Pagination";

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [employees, setEmployees] = useState(null);
  const [brands, setBrands] = useState([]);
  const [boardGames, setBoardGames] = useState([]);
  const [fetchParams, setFetchParams] = useState({ sort: "", nameOrder: "", levelOrder: "", positionOrder: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  //FETCHING EMPLOYEES
  const fetchEmployees = async (sort, order) => {
    const res = await fetch(`/api/employees?sort=${sort}&order=${order}`);
    return res.json();
  };

  //DELETING EMPLOYEES
  const deleteEmployee = async (id) => {
    return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
      res.json()
    );
  };

  //DELETE EMPLOYEE
  const handleDelete = (id) => {
    deleteEmployee(id);
    setConfirmDelete(false);
    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  //PAGINATION INDEXES
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  //FETCHING BRANDS
  const fetchBrands = () => {
    return fetch(`/api/brands`)
      .then(res => res.json())
      .catch(err => console.log("FETCH BRANDS ERR: ", err))
  };

  //FETCHING GAMES  
  const fetchGames = () => {
    return fetch(`/api/boardgame`)
      .then(res => res.json())
      .catch(err => console.log("FETCH DIVISIONS ERR: ", err))
  };

  useEffect(() => {
    Promise.all([
      fetchBrands(),
      fetchGames(),
      fetchEmployees(fetchParams.sort, fetchParams.nameOrder || fetchParams.levelOrder || fetchParams.positionOrder)
    ])
      .then((res) => {
        setBrands(res[0]);
        setBoardGames(res[1]);
        setEmployees(res[2]);
        setLoading(false);
      })
      .catch(err => console.log(err))

  }, [fetchParams, isUpdated]);

  if (loading) {
    return <Loading />;
  };

  if (!confirmDelete) {
    return (<>
      <EmployeeTable
        employees={employees.slice(firstPostIndex, lastPostIndex)}
        setFetchParams={setFetchParams}
        fetchParams={fetchParams}
        setIsUpdated={setIsUpdated}
        setEmployees={setEmployees}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        brands={brands}
        boardGames={boardGames}
        onDelete={handleDelete} />
      <Pagination
        postPerPage={postPerPage}
        totalPosts={employees.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} />
    </>)
  };
  
  return (<>
    <EmployeeTable
      employees={employees.slice(firstPostIndex, lastPostIndex)}
      setFetchParams={setFetchParams}
      fetchParams={fetchParams}
      setIsUpdated={setIsUpdated}
      setEmployees={setEmployees}
      confirmDelete={confirmDelete}
      setConfirmDelete={setConfirmDelete}
      brands={brands}
      boardGames={boardGames}
      onDelete={handleDelete} />
  </>);
};

export default EmployeeList;
