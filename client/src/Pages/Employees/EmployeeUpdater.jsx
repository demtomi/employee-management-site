import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import '../../index.css';

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const [equipment, setEquipment] = useState([]);
  const [brands, setBrands] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [boardGames, setBoardGames] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({
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

  console.log(selectedEmployee);


  const levelOptions = ["Junior", "Medior", "Senior", "Expert", "Godlike"];
  const positionOptions = ["Main Actor", "Comic Relief", "Love Interests", "Protagonist", "Antagonist", "Operatour", "Director", "Joker", "Superhero"];
  const presentOptions = ["true", "false"];
  const gameOptions = boardGames.map(game => game);
  const divisionOptions = divisions.map(div => div);
  const equipmentOptions = equipment.map(item => item);
  const brandOptions = brands.map(brand => brand);

  //CREATING NEW EMPLOYEE
  function handleSave(id) {
    return fetch(`/api/employees/${id}`, {
      method: `PATCH`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedEmployee)
    })
      .then(res => res.json())
      .then(data => {
        console.log(`UPDATED DATA: `, data);
        setSaved(true);
      })
      .catch(err => console.log(`PATCH ERROR: `, err))
  }

  //FETCHING SELECTED EMPLOYEE
  function fetchEmployee() {
    return fetch(`/api/employees/${id}`)
      .then(res => res.json())
      .catch(err => console.log(err))
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

  //USEEFFECT
  useEffect(() => {
    Promise.all([
      fetchEquipment(),
      fetchBrands(),
      fetchDivisions(),
      fetchGames(),
      fetchEmployee()
    ])
      .then((res) => {
        setEquipment(res[0]);
        setBrands(res[1]);
        setDivisions(res[2]);
        setBoardGames(res[3]);
        setSelectedEmployee(res[4])
        setLoading(false);
      })
      .catch(err => console.log(err))
  }, [loading, id]);

  //FORMATTING DATE
  function dateFormatter(date) {
    return date === null ? "N/A" : date.split("T").shift();
  };


  //MAIN RENDER FUNCTION
  function renderEmployeeUpdater() {

    if (loading) {
      return <Loading />
    };

    if (saved) {
      return (
        <div className="employee-form-container">
          <h2>Employee updated:</h2>
          <h3>Name: {selectedEmployee.name}</h3>
          <h3>Level: {selectedEmployee.level}</h3>
          <h3>Position: {selectedEmployee.position}</h3>
          <h3>Present: {selectedEmployee.present}</h3>
          <h3>Salary: {selectedEmployee.salary}</h3>
          <h3>Desired salary: {selectedEmployee.desired_salary}</h3>
          <h3>Fav color: {selectedEmployee.fav_color}</h3>
          <h3>Fav game: {selectedEmployee.fav_game}</h3>
          <h3>Division: {selectedEmployee.division}</h3>
          <h3>Equipment: {selectedEmployee.equipment}</h3>
          <h3>Fav brand: {selectedEmployee.fav_brand}</h3>
          <h3>Started at: {selectedEmployee.starting_date}</h3>
          <h3>Address: {selectedEmployee.address.country}</h3>
          <h3>{selectedEmployee.address.city}</h3>
          <h3>{selectedEmployee.address.street}</h3>
          <h3>{selectedEmployee.address.zip}</h3>
          <div>
            <button className="cancel-confirm-button" onClick={() => navigate("/")}>Back to Employees</button>
          </div>
        </div>
      )
    }

    return (
      <div className="employee-form-container">
        <div>
          <input value={selectedEmployee.name} placeholder={"Name"} type="text" onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}></input>

          <select value={selectedEmployee.level} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, level: e.target.value })}>
            <option value="">Select a level</option>
            {levelOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select><br />

          <select value={selectedEmployee.position} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, position: e.target.value })}>
            <option value="">Select a position</option>
            {positionOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select><br />

          <select value={selectedEmployee.present} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, present: e.target.value })}>
            <option value="">Present?</option>
            {presentOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input value={selectedEmployee.salary} placeholder={"Salary"} type="number" onChange={(e) => setSelectedEmployee({ ...selectedEmployee, salary: e.target.value })}></input>
          <input value={selectedEmployee.desired_salary} placeholder={"Desired salary"} type="number" onChange={(e) => setSelectedEmployee({ ...selectedEmployee, desired_salary: e.target.value })}></input>
          <input value={selectedEmployee.fav_color} type="color" onChange={(e) => setSelectedEmployee({ ...selectedEmployee, fav_color: e.target.value })}></input>

          <select value={selectedEmployee.fav_game} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, fav_game: e.target.value })}>
            <option value="">Favourite game</option>
            {gameOptions.map((option, index) => (
              <option key={index} value={option._id}>
                {option.name}
              </option>
            ))}
          </select><br />

          <select value={selectedEmployee.division} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, division: e.target.value })}>
            <option value="">Division</option>
            {divisionOptions.map((option, index) => (
              <option key={index} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>

          <select value={selectedEmployee.equipment} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, equipment: e.target.value })}>
            <option value="">Equipment</option>
            {equipmentOptions.map((option, index) => (
              <option key={index} value={option._id}>
                {option.name}
              </option>
            ))}
          </select><br />

          <select value={selectedEmployee.fav_brand} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, fav_brand: e.target.value })}>
            <option value="">Favourite brand</option>
            {brandOptions.map((option, index) => (
              <option key={index} value={option._id}>
                {option.name}
              </option>
            ))}
          </select><br />

          <input placeholder={"Starting date"} type="date" onChange={(e) => setSelectedEmployee({ ...selectedEmployee, starting_date: e.target.value })}></input>
          <p>{dateFormatter(selectedEmployee.starting_date)}</p>

          <input value={selectedEmployee.address.country} placeholder={"Country"} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, address: { ...selectedEmployee.address, country: e.target.value } })}></input>
          <input value={selectedEmployee.address.city} placeholder={"City"} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, address: { ...selectedEmployee.address, city: e.target.value } })}></input>
          <input value={selectedEmployee.address.street} placeholder={"Street"} onChange={(e) => setSelectedEmployee({ ...selectedEmployee, address: { ...selectedEmployee.address, street: e.target.value } })}></input>
          <input value={selectedEmployee.address.zip} placeholder={"Zip"} type="number" onChange={(e) => setSelectedEmployee({ ...selectedEmployee, address: { ...selectedEmployee.address, zip: e.target.value } })}></input>
        </div>
        <div>
          <button className="cancel-confirm-button" onClick={() => navigate("/")}>Cancel</button>
          <button className="cancel-confirm-button" onClick={() => handleSave(id)}>Save</button>
        </div>
      </div>
    )
  };

  return <>{renderEmployeeUpdater()}</>;
};

export default EmployeeUpdater;
