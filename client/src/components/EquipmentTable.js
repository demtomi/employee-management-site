import React from 'react';
import './EquipmentTable.css';

const EquipmentTable = ({ equipment }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th key={1}>Type</th>
                    <th key={2}>Brand</th>
                    <th key={3}>OS</th>
                </tr>
            </thead>
            <tbody>
                {equipment.map((equip) => (
                    <tr>
                        <td key={equip.id}>{equip.type}</td>
                        <td key={equip.id}>{equip.brand}</td>
                        <td key={equip.id}>{equip.OS}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EquipmentTable;
