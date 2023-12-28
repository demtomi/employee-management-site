import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './EmployeeForm.css';

const EmployeeForm = ({ disabled, employee, divisions, equipment, brands, handleUpdateEmployee, setCreatedEmployee, setIsCreated, createEmployee, boardGames }) => {
  const navigate = useNavigate();
  console.log("DIVISIONs: ",divisions);
  console.log("BRANDS: ",brands);
  console.log("EQUIP:" ,equipment);
  console.log("GAMES: ",boardGames);
  console.log("EMPLOYEE: ",employee);

  const [equipmentId, setEquipmentId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [divisionId, setDivisionId] = useState(null);
  const [boardGameName, setBoardGameName] = useState(null);
  const [boardGameMax, setBoardGameMax] = useState(null);

  //OPTIONS FOR SELEC ELEMENTS
  const divisionOptions = divisions.map((division) => ({
    value: division._id,
    label: division.name
  }));

  const brandOptions = brands.map((brand) => ({
    value: brand._id,
    label: brand.name
  }));

  const equipmentOptions = equipment.map((item) => ({
    value: item._id,
    label: item.name
  }));

  const boardGamesOptions = boardGames.map((game) => ({
    value: game.maxPlayer,
    label: game.name
  }));

  //SUBMITTING THE ENTIRE FROM
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    let newEmployee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    newEmployee.equipment = equipmentId;
    newEmployee.fav_brand = brandId;
    newEmployee.division = divisionId;
    newEmployee.fav_game = { name: boardGameName, maxPlayer: boardGameMax };

    if (employee) {
      return handleUpdateEmployee(newEmployee);
    } else {
      setCreatedEmployee(newEmployee);
      setIsCreated(true);
      navigate("/");
      return createEmployee(newEmployee);
    };
  };

  //ASSIGNING FUNCTIONS FOR SELEC ELEMENT
  function assignEquipment(e) {
    setEquipmentId(e.value);
  };

  function assignBrands(e) {
    setBrandId(e.value);
  };

  function assignDivisions(e) {
    setDivisionId(e.value);
  };

  function assignGames(e) {
    setBoardGameName(e.label);
    setBoardGameMax(e.value);
  };

//MAIN RENDER FUNCTION
  function renderEmployeeForm() {
    return (
      <form className="EmployeeForm" onSubmit={onSubmit} >
        {employee && (
          <input type="hidden" name="_id" defaultValue={employee._id} />
        )}

        <div className="control">
          <label htmlFor="name">Name:</label>
          <input
            defaultValue={employee ? employee.name : null}
            name="name"
            id="name"
            type="text"
          />
        </div>

        <div className="control">
          <label htmlFor="level">Level:</label>
          <input
            defaultValue={employee ? employee.level : null}
            name="level"
            id="level"
            type="text"
          />
        </div>

        <div className="control">
          <label htmlFor="position">Position:</label>
          <input
            defaultValue={employee ? employee.position : null}
            name="position"
            id="position"
            type="text"
          />
        </div>
        <div className="control">
          <label htmlFor="salary">Salary:</label>
          <input
            defaultValue={employee ? employee.salary : null}
            name="salary"
            id="salary"
            type="number"
          />
        </div>
        <div className="control">
          <label htmlFor="desired-salary">Desired salary:</label>
          <input
            defaultValue={employee ? employee.desired_salary : null}
            name="desired-salary"
            id="desired-salary"
            type="number"
          />
        </div>
        <div className="control">
          <label htmlFor="fav-color">Favourite color:</label>
          <input
            defaultValue={employee ? employee.fav_color : null}
            name="fav-color"
            id="fav-color"
            type="color"
          />
        </div>
        <div className="control">
          <label htmlFor="starting_date">Starting date:</label>
          <input
            defaultValue={employee ? employee.starting_date : null}
            name="starting_date"
            id="starting_date"
            type="date"
          />
        </div>

        <div className="control">
          <label htmlFor="equipment">Equipment:</label>
          <Select
            defaultValue={employee.equipment === null || employee.equipment === undefined ? "N/A" : employee.equipment._id}
            placeholder={employee.equipment === null || employee.equipment === undefined ? "N/A" : employee.equipment.name}
            options={equipmentOptions}
            onChange={assignEquipment}>
          </Select>
        </div>

        <div className="control">
          <label htmlFor="brands">Brands:</label>
          <Select
            defaultValue={employee.fav_brand === null || employee.fav_brand === undefined ? "N/A" : employee.fav_brand._id}
            placeholder={employee.fav_brand === null || employee.fav_brand === undefined ? "N/A" : employee.fav_brand.name}
            options={brandOptions}
            onChange={assignBrands}>
          </Select>
        </div>

        <div className="control">
          <label htmlFor="divisions">Divisions:</label>
          <Select
            defaultValue={employee.division === null || employee.division === undefined ? "N/A" : employee.division._id}
            placeholder={employee.division === null || employee.division === undefined ? "N/A" : employee.division.name}
            options={divisionOptions}
            onChange={assignDivisions}>
          </Select>
        </div>

        <div className="control">
          <label htmlFor="boardGAme">Games:</label>
          <Select
            defaultValue={boardGames.name === null || boardGames.name === undefined ? "N/A" : boardGames.name}
            placeholder={boardGames.name === null || boardGames.name === undefined ? "N/A" : employee.fav_game.name}
            options={boardGamesOptions}
            onChange={assignGames}>
          </Select>
        </div>

        <div className="buttons">
          <button type="submit" disabled={disabled}>
            {employee ? "Update Employee" : "Create Employee"}
          </button>

          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    );
  };

  return <>{renderEmployeeForm()}</>;
};

export default EmployeeForm;
