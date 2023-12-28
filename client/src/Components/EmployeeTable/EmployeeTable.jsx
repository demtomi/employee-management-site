import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import SearchBar from "../SearchBar/SearchBar";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete, fetchParams, setFetchParams, setIsUpdated, confirmDelete, setConfirmDelete}) => {

  // console.log(employees);

  const navigate = useNavigate();

  const [searchLevel, setSearchLevel] = useState("");
  const [searchPosition, setSearchPosition] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [firstArrow, setFirstArrow] = useState(false);
  const [middleArrow, setMiddleArrow] = useState(false);
  const [lastArrow, setLaststArrow] = useState(false);
  const [nameArrow, setNameArrow] = useState(false);

  const [arrangeFirst, setArrangeFirst] = useState(false);
  const [arrangeMidle, setArrangeMidle] = useState(false);
  const [arrangeLast, setArrangeLast] = useState(false);
  const [arrangeLevel, setArrangeLevel] = useState(false);
  const [arrangePosition, setArrangePosition] = useState(false);

  const [isLevelActive, setIsLevelActive] = useState(false);
  const [isPositionActive, setIsPositionActive] = useState(false);
  const [nameTitleActive, setNameTitleActive] = useState(false);

  const [deletingEmployee, setDeletingEmployee] = useState([]);


  //BUTTON STYLES AND CONDITIONAL STYLES
  function buttonSytles(param) {
    let stateName = ""
    if (param === "first") {
      stateName = arrangeFirst
    } else if (param === "middle") {
      stateName = arrangeMidle
    } else if (param === "last") {
      stateName = arrangeLast
    } else if (param === "level") {
      stateName = isLevelActive
    } else if (param === "position") {
      stateName = isPositionActive
    } else {
      stateName = nameTitleActive
    };

    return {
      padding: '0.1rem 0.8rem',
      margin: '0.1rem',
      fontSize: '10px',
      color: 'black',
      outline: 'rgb(99, 151, 254)',
      borderRadius: '4px',
      cursor: 'pointer',
      backgroundColor: stateName ? 'rgb(99, 151, 254)' : 'white',
      borderColor: stateName ? 'rgb(99, 151, 254)' : 'initial',
    };
  };

  //CLEAR FILTERS
  function clearFilters() {
    setSearchLevel("");
    setSearchPosition("");
    setSearchInput("");

    setArrangeFirst(false);
    setArrangeMidle(false);
    setArrangeLast(false);
    setArrangeLevel(false);
    setArrangePosition(false);

    setIsLevelActive(false);
    setIsPositionActive(false);
    setNameTitleActive(false);

    setFirstArrow(false);
    setMiddleArrow(false);
    setLaststArrow(false);
    console.log("Filteres and Sort cleared!!");
  };

  //SORT NAME FUNCTIONS
  function handleNameSort() {
    const updatedFetchParams = { ...fetchParams, sort: 'name', levelOrder: "", positionOrder: "" };

    if (fetchParams.nameOrder === 'asc') {
      updatedFetchParams.nameOrder = 'desc';
    } else {
      updatedFetchParams.nameOrder = 'asc';
    };
    setFetchParams(updatedFetchParams);
    setNameTitleActive(true);
    setNameArrow(prevState => !prevState);

    setArrangeFirst(false);
    setArrangeMidle(false);
    setArrangeLast(false);
    setArrangeLevel(false);
    setArrangePosition(false);

    setFirstArrow(false);
    setMiddleArrow(false);
    setLaststArrow(false);

    setIsLevelActive(false);
    setIsPositionActive(false);
  };

  //SORT FIRST NAME FUNCTIONS
  function handleFirstNameSort() {
    const updatedFetchParams = { ...fetchParams, sort: 'firstname', levelOrder: "", positionOrder: "" };

    if (fetchParams.nameOrder === 'asc') {
      updatedFetchParams.nameOrder = 'desc';
    } else {
      updatedFetchParams.nameOrder = 'asc';
    };
    setFetchParams(updatedFetchParams);

    setFirstArrow(prevState => !prevState);
    setArrangeFirst(true);

    setArrangeMidle(false);
    setArrangeLast(false);
    setArrangeLevel(false);
    setArrangePosition(false);

    setNameArrow(false);
    setMiddleArrow(false);
    setLaststArrow(false);

    setIsLevelActive(false);
    setIsPositionActive(false);
    setNameTitleActive(false);
  };

  // SORT BY MIDDLE NAME FUNCTION
  function handleMiddleNameSort() {
    const updatedFetchParams = { ...fetchParams, sort: 'middlename', levelOrder: "", positionOrder: "" };

    if (fetchParams.nameOrder === 'asc') {
      updatedFetchParams.nameOrder = 'desc';
    } else {
      updatedFetchParams.nameOrder = 'asc';
    };
    setFetchParams(updatedFetchParams);

    setMiddleArrow(prevState => !prevState);
    setArrangeMidle(true);

    setArrangeFirst(false);
    setArrangeLast(false);
    setArrangeLevel(false);
    setArrangePosition(false);

    setNameArrow(false);
    setFirstArrow(false);
    setLaststArrow(false);

    setIsLevelActive(false);
    setIsPositionActive(false);
    setNameTitleActive(false);
  };

  //SORT BY LAST NAME FUNCTION
  function handleLastNameSort() {
    const updatedFetchParams = { ...fetchParams, sort: 'lastname', levelOrder: "", positionOrder: "" };

    if (fetchParams.nameOrder === 'asc') {
      updatedFetchParams.nameOrder = 'desc';
    } else {
      updatedFetchParams.nameOrder = 'asc';
    };
    setFetchParams(updatedFetchParams);

    setLaststArrow(prevState => !prevState);
    setArrangeLast(true);

    setArrangeFirst(false);
    setArrangeMidle(false);
    setArrangeLast(false);
    setArrangeLevel(false);
    setArrangePosition(false);

    setNameArrow(false);
    setFirstArrow(false);
    setMiddleArrow(false);

    setIsLevelActive(false);
    setIsPositionActive(false);
    setNameTitleActive(false);
  };

  //SORT LEVEL FUNCTION
  function handleLevelSort() {
    const updatedFetchParams = { ...fetchParams, sort: 'level', positionOrder: "", nameOrder: "" };

    if (fetchParams.levelOrder === 'asc') {
      updatedFetchParams.levelOrder = 'desc';
    } else {
      updatedFetchParams.levelOrder = 'asc';
    };
    setFetchParams(updatedFetchParams);
    setArrangeLevel(prevState => !prevState);
    setIsLevelActive(true);

    setArrangeFirst(false);
    setArrangeMidle(false);
    setArrangeLast(false);
    setArrangeLevel(false);
    setArrangePosition(false);

    setNameArrow(false);
    setFirstArrow(false);
    setMiddleArrow(false);
    setLaststArrow(false);

    setIsPositionActive(false);
    setNameTitleActive(false);
  };

  //SORT POSITION FUNCTION
  function handlePositionSort() {
    const updatedFetchParams = { ...fetchParams, sort: 'position', levelOrder: "", nameOrder: "" };

    if (fetchParams.positionOrder === 'asc') {
      updatedFetchParams.positionOrder = 'desc';
    } else {
      updatedFetchParams.positionOrder = 'asc';
    };
    setFetchParams(updatedFetchParams);
    setArrangePosition(prevState => !prevState);
    setIsPositionActive(true);

    setArrangeFirst(false);
    setArrangeMidle(false);
    setArrangeLast(false);
    setArrangeLevel(false);
    setArrangePosition(false);

    setNameArrow(false);
    setFirstArrow(false);
    setMiddleArrow(false);
    setLaststArrow(false);

    setIsLevelActive(false);
    setNameTitleActive(false);
  };

  //CHECKBOXES
  async function handleCheckbox(e) {
    const selectedEmployee = employees.filter((employee) => employee._id === e.target.id);

    const presentStatus = selectedEmployee[0].present;

    return fetch(`api/employees/${selectedEmployee[0]._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ present: presentStatus === false ? true : false }),
    })
      .then(res => res.json())
      .then(data => {
        console.log("UPDATED DATA: ", data);
        setIsUpdated(prevState => !prevState);
      })
      .catch(err => console.log("PATCH ERROR: ", err))
  };

  function checkBox(employee) {
    const isChecked = employee.present;

    return (
      <input id={employee._id} type="checkbox" checked={isChecked} onChange={handleCheckbox} />
    )
  };

  //DELETE BUTTON FUNCTION
  function handleDelete(e) {
    console.log(e.target.id);
    const result = employees.find((item) => item._id === e.target.id ? item : null);
    console.log(result);
    setDeletingEmployee(result);
    setConfirmDelete(true);
  };

  //FORMATTING DATE
  function dateFormatter(date) {
    return date === null ? "N/A" : date.split("T").shift();
  };

  //RENDER FUNCTION
  function renderEmployeeTable() {

    //DELETE VALIDATION WINDOW
    if (confirmDelete) {
      return (
        <div className="equipment-form-container">
          <div>
            <h3>Are you sure you want to Delete the following Employee?</h3>
            <h2>Name: {deletingEmployee.name}</h2>
            <h2>Level: {deletingEmployee.level}</h2>
            <h2>Position: {deletingEmployee.position}</h2>
            <h2>Equipment: {deletingEmployee.equipment}</h2>
          </div>
          <div>
            <button
              className="cancel-confirm-button"
              onClick={() => setConfirmDelete(false)}>Cancel</button>
            <button
              id={deletingEmployee}
              className="delete-button"
              onClick={() => onDelete(deletingEmployee._id)}>Delete</button>
          </div>
        </div>
      )
    };

    //MAIN RETUNR 
    return (<div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>
              <SearchBar setSearchInput={setSearchInput} />
            </th>
            <th>
              <Dropdown setSearchLevel={setSearchLevel} searchLevel={searchLevel} searchPosition={searchPosition} setSearchPosition={setSearchPosition} id="level" />
            </th>
            <th>
              <Dropdown setSearchLevel={setSearchLevel} searchLevel={searchLevel} searchPosition={searchPosition} setSearchPosition={setSearchPosition} id="position" />
            </th>
            <th>
              {searchInput !== "" || searchLevel !== "" || searchPosition !== "" ?
                <button onClick={clearFilters}>Clear filters</button> : <></>}
            </th>
          </tr>
          <tr>
            <th
            >Name
              <button
                style={buttonSytles("first")}
                id="name"
                onClick={handleNameSort} >Full
                <span className={`first-arrow ${nameArrow ? 'up' : 'down'}`}>&#9660;</span>
              </button>
              <button
                style={buttonSytles("first")}
                id="name"
                onClick={handleFirstNameSort} >First
                <span className={`first-arrow ${firstArrow ? 'up' : 'down'}`}>&#9660;</span>
              </button>
              <button
                style={buttonSytles("middle")}
                id="name"
                onClick={handleMiddleNameSort} >Middle
                <span className={`middle-arrow ${middleArrow ? 'up' : 'down'}`}>&#9660;</span>
              </button>
              <button
                style={buttonSytles("last")}
                id="name"
                onClick={handleLastNameSort} >Last
                <span className={`last-arrow ${lastArrow ? 'up' : 'down'}`}>&#9660;</span>
              </button>
            </th>
            <th>Level
              <button
                style={buttonSytles("level")}
                onClick={handleLevelSort}>{!arrangeLevel ? 'a-z' : 'z-a'}</button>
            </th>
            <th>Position
              <button
                style={buttonSytles("position")}
                onClick={handlePositionSort}>{!arrangePosition ? 'a-z' : 'z-a'}</button>
            </th>
            <th>Present</th>
            <th>Started at:</th>
            <th>Salary
              <button
                style={buttonSytles("position")}
                onClick={() => navigate('/top-paid')}
              >Top 3
              </button>
            </th>
            <th>Dersired salary</th>
            <th>Diff</th>
            <th>Favourite color</th>
            <th>Favourite brand</th>
            <th>Max players</th>
            <th>City</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {employees.filter((item) => {
            const isLevelMatch = searchLevel === "" || item.level === searchLevel;
            const isPositionMatch = searchPosition === "" || item.position === searchPosition;
            const isNameMatch = searchInput === "" || item.name.trim().toLowerCase().includes(searchInput.toLowerCase());
            return isLevelMatch && isPositionMatch && isNameMatch;
          }).map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>{checkBox(employee)}</td>
              <td>{dateFormatter(employee.starting_date)}</td>
              <td>{"$ " + employee.salary}</td>
              <td>{"$ " + employee.desired_salary}</td>
              <td>{"$ " + (employee.desired_salary - employee.salary)}</td>
              <td style={{ backgroundColor: employee.fav_color }}></td>
              <td>{employee.fav_brand.name}</td>
              <td>{employee.fav_game.maxPlayer}</td>
              <td>{employee.address.city}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" id={employee._id} onClick={handleDelete}>
                  Delete
                </button>
                <Link to={`/kittens/${employee._id}`}>
                  <button type="button" id={employee._id}>Kittens</button>
                </Link>
                <Link to={`/${employee._id}/address`}>
                  <button type="button" id={employee._id}>Address</button>
                </Link>
                <Link to={`/${employee._id}/notes`}>
                  <button type="button" id={employee._id}>Notes</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  };

  //RETURN
  return <>{renderEmployeeTable()}</>;
};

export default EmployeeTable;
