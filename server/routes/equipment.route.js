const express = require('express');
const router = express.Router();
const EquipmentModel = require("../db/equipment.model");

// GET REQUEST FOR EQUIPMENT
router.get("/equipment", async (req, res) => {
    const equipment = await EquipmentModel.find();
    try {
        res.json(equipment)
    } catch (error) {
        console.log(error);
    }
});

router.patch('/update/:id', async (req, res) => {

    try {
        const equipment = await EquipmentModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { ...req.body } },
            { new: true }
        );
        console.log("REQ.BODY: ", req.body);
        return res.json(equipment);
    } catch (err) {
        console.log("PATCH ERROR: ", err.message);
        return next(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const equipment = await EquipmentModel.findById(req.params.id);
        const deleted = await equipment.delete();
        return res.json(deleted);
    } catch (err) {
        console.log(err.message);
        return next(err);
    }
});

router.post("/", async (req, res, next) => {
    const equipment = req.body;

    try {
        const saved = await EquipmentModel.create(equipment);
        return res.json(saved);
    } catch (err) {
        console.log(err.message);
        return next(err);
    }
});

module.exports = router;