import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading"
import '../../index.css';

const EmployeeCreator = () => {

  const navigate = useNavigate();

  const [newEmployee, setNewEmployee] = useState({
    name: null,
    level: null,
    position: null,
    present: null,
    salary: null,
    desired_salary: null,
    fav_color: null,
    fav_game: null,
    division: null,
    equipment: null,
    fav_brand: null,
    starting_date: null,
    address: { country: null, city: null, street: null, zip: null }
  });

  const [loading, setLoading] = useState(true);
  const [isCreated, setIsCreated] = useState(false);

  const [equipment, setEquipment] = useState([]);
  const [brands, setBrands] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [boardGames, setBoardGames] = useState([]);


  const levelOptions = ["Junior", "Medior", "Senior", "Expert", "Godlike"];
  const positionOptions = ["Main Actor", "Comic Relief", "Love Interests", "Protagonist", "Antagonist", "Operatour", "Director", "Joker", "Superhero"];
  const presentOptions = ["true", "false"];
  const gameOptions = boardGames.map(game => game);
  const divisionOptions = divisions.map(div => div);
  const equipmentOptions = equipment.map(item => item);
  const brandOptions = brands.map(brand => brand);

  //CREATING NEW EMPLOYEE
  const createEmployee = (newEmployee) => {
    console.log("NEW EMP: ", newEmployee);
    return fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    })
      .then((res) => res.json())
      .then(data => {
        console.log("POSTED DATA: ", data);
        setIsCreated(true);
      })
      .catch(err => console.log("POST ERROR: ", err))
  };

  //FETCHING EQUIPMENT
  const fetchEquipment = () => {
    return fetch(`/api/equipment`)
      .then(res => res.json())
      .catch(err => console.log("FETCH EQUIPMENT ERR: ", err))
  };

  //FETCHING BRANDS
  const fetchBrands = () => {
    return fetch(`/api/brands`)
      .then(res => res.json())
      .catch(err => console.log("FETCH BRANDS ERR: ", err))
  };

  //FETCHING DIVISIONS
  const fetchDivisions = () => {
    return fetch(`/api/divisions`)
      .then(res => res.json())
      .catch(err => console.log("FETCH DIVISIONS ERR: ", err))
  };

  //FETCHING GAMES  
  const fetchGames = () => {
    return fetch(`/api/boardgame`)
      .then(res => res.json())
      .catch(err => console.log("FETCH DIVISIONS ERR: ", err))
  };

  //SETTING EMPLOYEE BY ID
  useEffect(() => {
    Promise.all([
      fetchEquipment(),
      fetchBrands(),
      fetchDivisions(),
      fetchGames()
    ])
      .then((res) => {
        setEquipment(res[0]);
        setBrands(res[1]);
        setDivisions(res[2]);
        setBoardGames(res[3]);
        console.log(res);
        setLoading(false);
      })
      .catch(err => console.log(err))
  }, [loading]);

  //MAIN RENDER FUNCTION
  function renderEmployeeCreator() {

    if (loading) {
      return <Loading />
    };

    if (isCreated) {
      return (
        <div className="employee-form-container">
          <h2>New employee created:</h2>
          <h3>Name: {newEmployee.name}</h3>
          <h3>Name: {newEmployee.level}</h3>
          <h3>Name: {newEmployee.position}</h3>
          <h3>Name: {newEmployee.present}</h3>
          <h3>Name: {newEmployee.salary}</h3>
          <h3>Name: {newEmployee.desired_salary}</h3>
          <h3>Name: {newEmployee.fav_color}</h3>
          <h3>Name: {newEmployee.fav_game}</h3>
          <h3>Name: {newEmployee.division}</h3>
          <h3>Name: {newEmployee.equipment}</h3>
          <h3>Name: {newEmployee.fav_brand}</h3>
          <h3>Name: {newEmployee.starting_date}</h3>
          <h3>Name: {newEmployee.address.country}</h3>
          <h3>Name: {newEmployee.address.city}</h3>
          <h3>Name: {newEmployee.address.street}</h3>
          <h3>Name: {newEmployee.address.zip}</h3>
        </div>
      )
    };

    return (
      <div className="employee-form-container">
        <div>
          <input placeholder={"Name"} type="text" onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}></input>

          <select onChange={(e) => setNewEmployee({ ...newEmployee, level: e.target.value })}>
            <option value="">Select a level</option>
            {levelOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select><br />

          <select onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}>
            <option value="">Select a position</option>
            {positionOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select><br />

          <select onChange={(e) => setNewEmployee({ ...newEmployee, present: e.target.value })}>
            <option value="">Present?</option>
            {presentOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input placeholder={"Salary"} type="number" onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}></input>
          <input placeholder={"Desired salary"} type="number" onChange={(e) => setNewEmployee({ ...newEmployee, desired_salary: e.target.value })}></input>
          <input type="color" onChange={(e) => setNewEmployee({ ...newEmployee, fav_color: e.target.value })}></input>

          <select onChange={(e) => setNewEmployee({ ...newEmployee, fav_game: e.target.value })}>
            <option value="">Favourite game</option>
            {gameOptions.map((option, index) => (
              <option key={index} value={option._id}>
                {option.name}
              </option>
            ))}
          </select><br />

          <select onChange={(e) => setNewEmployee({ ...newEmployee, division: e.target.value })}>
            <option value="">Division</option>
            {divisionOptions.map((option, index) => (
              <option key={index} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>

          <select onChange={(e) => setNewEmployee({ ...newEmployee, equipment: e.target.value })}>
            <option value="">Equipment</option>
            {equipmentOptions.map((option, index) => (
              <option key={index} value={option._id}>
                {option.name}
              </option>
            ))}
          </select><br />

          <select onChange={(e) => setNewEmployee({ ...newEmployee, fav_brand: e.target.value })}>
            <option value="">Favourite brand</option>
            {brandOptions.map((option, index) => (
              <option key={index} value={option._id}>
                {option.name}
              </option>
            ))}
          </select><br />

          <input placeholder={"Starting date"} type="date" onChange={(e) => setNewEmployee({ ...newEmployee, starting_date: e.target.value })}></input>

          <input placeholder={"Country"} onChange={(e) => setNewEmployee({ ...newEmployee, address: { ...newEmployee.address, country: e.target.value } })}></input>
          <input placeholder={"City"} onChange={(e) => setNewEmployee({ ...newEmployee, address: { ...newEmployee.address, city: e.target.value } })}></input>
          <input placeholder={"Street"} onChange={(e) => setNewEmployee({ ...newEmployee, address: { ...newEmployee.address, street: e.target.value } })}></input>
          <input placeholder={"Zip"} type="number" onChange={(e) => setNewEmployee({ ...newEmployee, address: { ...newEmployee.address, zip: e.target.value } })}></input>
        </div>
        <div>
          <button className="cancel-confirm-button" onClick={() => navigate("/")}>Cancel</button>
          <button className="cancel-confirm-button" onClick={() => createEmployee(newEmployee)}>Save</button>
        </div>
      </div>
    )
  };

  return <>{renderEmployeeCreator()}</>;
};

export default EmployeeCreator;
