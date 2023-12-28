import { Link } from "react-router-dom";
import { useState } from "react";

function EquipmentCreator() {
    const [newEquipment, setNewEquipment] = useState({ name: "", type: "", amount: 0 });
    const [created, setCreated] = useState(false);
    // console.log("NEW EQUIPMENT: ", newEquipment);

    function handleCreate(e) {
        if (newEquipment.name === "" || newEquipment.type === "" || newEquipment.amount === "") {
            alert("Input field can not be empty");
        } else {
            fetch(`/api/equipment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEquipment),
            })
                .then(res => res.json())
                .then(data => {
                    console.log("POST DATA: ", data);
                    setCreated(true);
                })
                .catch(err => console.log("POST ERROR: ", err))
        };
    };

    function renderEquipmentCreator() {
        if (created) {
            return (
                <div className="equipment-form-container">
                    <h2>Equipment created</h2>
                    <p>{newEquipment.name}</p>
                    <p>{newEquipment.type}</p>
                    <p>{newEquipment.amount}</p>
                    <Link to="/equipment">
                        <button type="button">Back to Equipments</button>
                    </Link>
                </div>
            )
        };

        return (
            <div className="equipment-form-container">
                <h2>Name</h2>
                <input
                    placeholder="Name"
                    onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                />
                <h2>Type</h2>
                <input
                    placeholder="Type"
                    onChange={(e) => setNewEquipment({ ...newEquipment, type: e.target.value })}
                />
                <h2>Amount</h2>
                <input
                    placeholder="Amount"
                    onChange={(e) => setNewEquipment({ ...newEquipment, amount: e.target.value })}
                />
                <Link to="/equipment">
                    <button type="button">Back to Equipments</button>
                </Link>
                <button className="submit-button" id={newEquipment.name} onClick={handleCreate}>
                    Create
                </button>
            </div>
        );
    };

    return <>{renderEquipmentCreator()}</>;
}

export default EquipmentCreator;