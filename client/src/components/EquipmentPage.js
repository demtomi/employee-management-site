import React from 'react';
import { useState, useEffect } from 'react';
import EquipmentTable from './EquipmentTable'

const EquipmentPage = () => {

    const [equipment, setEquipment] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/equipment")
            .then(res => res.json())
            .then(data => {
                setEquipment(data)
                setLoading(false);
            })
            .catch(error => {
                setLoading(true);
            });
    }, [equipment])

    function renderPage() {
        if (!loading) {
            return (
                <div>
                    <EquipmentTable equipment={equipment} />
                </div>
            );
        }

        return (
            <div>
                <h1>Please wait, employees table is loading...</h1>
            </div>
        );
    }

    //RETURN
    return <div className='App'>{renderPage()}</div>
};

export default EquipmentPage;
