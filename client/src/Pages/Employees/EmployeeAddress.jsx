import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";

const EmployeeAddress = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const [employee, setEmployee] = useState([]);
    const [newAddress, setNewAddress] = useState({ country: null, city: null, street: null, zip: null })

    //FETCHING EMPLOYEE BY URL ID
    function fetchEmployeeById(id) {
        return fetch(`/api/employees/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("SELECTED: ", data);
                setEmployee(data);
                setLoading(false);
                setNewAddress({ country: data.address.country, city: data.address.city, street: data.address.street, zip: data.address.zip })
            })
            .catch(err => console.log("FETCH ERR: ", err))
    };

    useEffect(() => {
        fetchEmployeeById(id)
    }, [id, loading, editing]);

    //SAVE BUTTON FUNCTION
    function handleSave() {
        return fetch(`/api/employees/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ address: { country: newAddress.country, city: newAddress.city, street: newAddress.street, zip: newAddress.zip } }),
        })
            .then(res => res.json())
            .then(data => {
                console.log("UPDATED DATA: ", data);
                setEditing(false);
            })
            .catch(err => console.log("PATCH ERROR: ", err))
    }

    //MAIN RENDER FUNCTION
    function renderEmployeeAddress() {

        //LOADING VIEW
        if (loading) {
            return (
                <Loading />
            )
        };

        //EDITING VIEW
        if (editing) {
            return (
                <div className="equipment-form-container">
                    <div>
                        <h3>ID: {employee._id}</h3>
                        <h3>Name: {employee.name}</h3>
                        <h3>Address:</h3>
                        <input placeholder={employee.address.country} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}></input>
                        <input placeholder={employee.address.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}></input>
                        <input placeholder={employee.address.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}></input>
                        <input placeholder={employee.address.zip} onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}></input>
                    </div>
                    <div>
                        <button className="cancel-confirm-button" onClick={() => setEditing(false)}>Cancel</button>
                        <button className="cancel-confirm-button" onClick={handleSave}>Save</button>
                    </div>
                </div>
            )
        };

        //MAIN RETURN
        return (
            <div className="equipment-form-container">
                <div>
                    <h3>ID: {employee._id}</h3>
                    <h3>Name: {employee.name}</h3>
                    <h3>Address:</h3>
                    <h3>Country: {employee.address.country}</h3>
                    <h3>City: {employee.address.city}</h3>
                    <h3>Street: {employee.address.street}</h3>
                    <h3>ZIP: {employee.address.zip}</h3>
                </div>
                <div>
                    <button className="cancel-confirm-button" onClick={() => navigate("/")}>Back to Employees</button>
                    <button className="cancel-confirm-button" onClick={() => setEditing(true)}>Edit</button>
                </div>
            </div>
        )
    };

    //RETURN
    return <>{renderEmployeeAddress()}</>;
};

export default EmployeeAddress;
