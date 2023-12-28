import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from "../../Components/Loading";

function DivisionDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [kittens, setKittens] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [created, setCreated] = useState(false);
    const [search, setSearch] = useState("");
    const [newKitten, setNewKitten] = useState({ name: null, weight: null, employee: id });
    const [loading, setLoading] = useState(true);

    console.log(newKitten);

    //FETCH KITTENS BY EMPLOYEE ID
    function fetchKittens(id) {
        return fetch(`/api/kittens/${id}`)
            .then(res => res.json())
            .catch(err => console.log("KITTEN ERR: ", err))
    };

    //FETCH SELECTED EMPLOYEE
    function fetchEmployee(id) {
        return fetch(`/api/employees/${id}`)
            .then(res => res.json())
            .catch(err => console.log("EMP ERR: ", err))
    };

    useEffect(() => {
        Promise.all([
            fetchKittens(id),
            fetchEmployee(id)
        ])
            .then((res) => {
                setKittens(res[0]);
                console.log("KITTENS: ",res[0]);
                setEmployee(res[1]);
                console.log("EMPLOYESS: ",res[1]);
                setLoading(false);
            })
            .catch(err => console.log(err))
    }, [id, created]);


    //CREATE NEW KITTEN
    function handleCreate(e) {
        if (newKitten.name === null || newKitten.weight === null) {
            alert("Input field can not be empty");
        } else {
            return fetch(`/api/kittens`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newKitten),
            })
                .then(res => res.json())
                .then(data => {
                    console.log("POST DATA: ", data);
                    setCreated(true);
                })
                .catch(err => console.log("POST ERROR: ", err))
        };
    };

    function renderEmployeeKittens() {

        if (loading) {
            return <Loading />;
        };


        return (<>
            <input className='search-bar' placeholder='Type name for search...' onChange={(e) => setSearch(e.target.value)}></input>
            <h2>Name: {employee.name}</h2>
            <div className="equipment-container">
                {kittens.filter((kitten) => kitten.name.trim().toLowerCase().includes(search) ? kitten.name : null).map((kitten) => {
                    return <div className="equipment" id={kitten._id} key={kitten._id}>
                        <h3 className="equipment-type">{kitten.name}</h3>
                        <div className="equipment-type">Name: {kitten.name}</div>
                        <div className="equipment-type">Weight: {kitten.weight} kg</div>
                    </div>
                })}
            </div>
            <h2>Create new kitten:</h2>
            <div className="equipment-container">
                <input placeholder="name" type="text" onChange={(e) => setNewKitten({ ...newKitten, name: e.target.value })}></input>
                <input placeholder="weight" type="number" onChange={(e) => setNewKitten({ ...newKitten, weight: e.target.value })}></input>
                <button onClick={handleCreate}>Create</button>
            </div>
            <button onClick={() => navigate("/")}>Back to Employees</button>
        </>
        )
    };

    return <>{renderEmployeeKittens()}</>;
};

export default DivisionDetails;
