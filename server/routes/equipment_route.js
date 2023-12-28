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

// UPDATE EQUIPMENT BY ID
router.patch('/update/:id', async (req, res) => {

    try {
        const equipment = await EquipmentModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { ...req.body } },
            { new: true }
        );

        if (!equipment) {
            return res.status(404).json({ message: "Item not found" });
        };

        return res.status(200).json(equipment);
    } catch (error) {

        return res.status(500).json({ message: "Server error: ", error });
    };
});

//DELETE EQUIPMENT BY ID
router.delete('/:id', async (req, res) => {
    try {
        const equipment = await EquipmentModel.findById(req.params.id);
        if (!equipment) {
            return res.status(404).json({ message: "Item not found" });
        };

        const deleted = await equipment.delete();
        return res.status(200).json(deleted);
    } catch (error) {

        return res.status(500).json({ message: "Server error: ", error });
    };
});

//CREATE NEW EQUIPMENT
router.post("/", async (req, res, next) => {
    const equipment = req.body;

    try {
        const saved = await EquipmentModel.create(equipment);
        if (!saved) {
            return res.status(404).json({ message: "Item not found" });
        };

        return res.status(200).json(saved);
    } catch (error) {

        return res.status(500).json({ message: "Server error: ", error });
    };
});

module.exports = router;