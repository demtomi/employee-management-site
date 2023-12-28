const express = require('express');
const router = express.Router();
const EquipmentModel = require("../db/equipment.model");

//GET ALL EQUIPMENT
router.get('/', async (req, res) => {
    try {
        const equipment = await EquipmentModel.find();
        if (!equipment) {
            return res.status(404).json({ message: "Item not found" });
        };

        return res.status(200).json(equipment);
    } catch (error) {

        return res.status(500).json({ message: "Server error: ", error });
    };
});

module.exports = router;