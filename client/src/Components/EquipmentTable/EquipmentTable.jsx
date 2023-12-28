import "./EquipmentTable.css";
import { useState } from "react";

const EquipmentTable = ({ equipment, updating, setUpdating, setIsDeleted }) => {

  const [updateObject, setUpdateObject] = useState({ name: '', type: '', amount: null });
  const [updatingValue, setUpdatingValue] = useState({ name: "", type: "", amount: null });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletingEquip, setDeletingEquip] = useState([]);

  //UPDATING EQUIPMENTS
  function handleUpdate(e) {
    console.log(e.target.id);
    const updating = equipment.find((item) => e.target.id === item._id);
    const updatingData = { ...updateObject, name: updating.name, type: updating.type, amount: updating.amount };
    setUpdating(true);
    setUpdateObject(updatingData);
  };

  function handleSubmit(e) {
    const data = equipment.find(item => item.name === e.target.id ? item._id : null);

    if (updatingValue.name === "" || updatingValue.type === "" || updatingValue.amount === null) {
      alert("Input field can not be empty");
    } else {
      fetch(`api/equipment/update/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatingValue),
      })
        .then(res => res.json())
        .then(data => {
          console.log("PATCH DATA: ", data);
          setUpdating(false);
        })
        .catch(err => console.log("PATCH ERROR: ", err))
    };

  };

  //DELETING AN EQUIPMENT
  function handleDelete(e) {
    const deleteID = e.target.id;

    fetch(`api/equipment/${deleteID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("DELETED: ", data);
        setIsDeleted(prevState => !prevState);
        setConfirmDelete(false);
      })
  };

  //CONFIRM DELETE
  function confirmDeleteFunc(e) {
    const result = equipment.find((item) => item._id === e.target.id ? item : null);
    setDeletingEquip(result);
    setConfirmDelete(true);
  };

  function renderEquipmentTable() {

    //DELETE CONFIRM VIEW
    if (confirmDelete) {
      return (
        <div className="equipment-form-container">
          <div>
            <h3>Are you sure you want to Delete the following equipment?</h3>
            <h2>Name: {deletingEquip.name}</h2>
            <h2>Type: {deletingEquip.type}</h2>
            <h2>Amount: {deletingEquip.amount}</h2>
          </div>
          <div>
            <button
              className="cancel-confirm-button"
              onClick={() => setConfirmDelete(false)}>Cancel</button>
            <button
              id={deletingEquip._id}
              className="delete-button"
              onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )
    };

    //UPDATING VIEW
    if (updating) {
      return (<div className="equipment-form-container">
        <h2>Name</h2>
        <input
          placeholder={updateObject.name}
          onChange={(e) => setUpdatingValue({ ...updatingValue, name: e.target.value })}></input>
        <h2>Type</h2>
        <input
          placeholder={updateObject.type}
          onChange={(e) => setUpdatingValue({ ...updatingValue, type: e.target.value })}></input>
        <h2>Amount</h2>
        <input
          placeholder={updateObject.amount}
          onChange={(e) => setUpdatingValue({ ...updatingValue, amount: e.target.value })}></input>
        <button
          className="cancel-button"
          onClick={() => setUpdating(false)}>Cancel</button>
        <button
          className="submit-button"
          id={updateObject.name}
          onClick={handleSubmit}>Submit</button>
      </div>

      )
    };

    //MAIN RETURN
    return (
      <div className="equipment-container">
        {equipment.map((item) => {
          return <div className="equipment" id={item._id} key={item._id}>
            {!updating ? <div className="equipment-name">{item.name}</div> : <input placeholder={item.name}></input>}
            <div className="equipment-type">{item.type}</div>
            <div className="equipment-amount">{item.amount}</div>
            <div className="equipment-assigned">{item.assigned_to}</div>
            <button
              id={item._id}
              className="update-button"
              onClick={handleUpdate}>Update</button>
            <button
              id={item._id}
              className="delete-button"
              onClick={confirmDeleteFunc}>Delete</button>
          </div>
        })}
      </div>
    )
  };

  //RETURN
  return <>{renderEquipmentTable()}</>;
};

export default EquipmentTable;
