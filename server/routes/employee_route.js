const express = require('express');
const router = express.Router();
const EmployeeModel = require("../db/employee.model");

//GET ONE EMPLOYEE BY ID
router.get("/:id", async (req, res) => {
    const employeeID = req.params.id;

    try {
        const employee = await EmployeeModel.findById(employeeID);

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        };

        return res.status(200).json(employee);
    } catch (error) {

        return res.status(500).json({ message: "Server error" });
    };
});

//CREATE NEW EMPLOYEE
router.post("/", async (req, res, next) => {
    const employee = req.body;
    try {
        const saved = await EmployeeModel.create(employee);

        if (!saved) {
            return res.status(500).json({ message: "Saved not found" })
        };

        return res.status(201).json(saved);
    } catch (error) {

        return res.status(500).json({ message: "Server error", error });
    };
});

//UPDATE AN EMPLOYEE
router.patch("/:id", async (req, res, next) => {
    try {

        const employee = await EmployeeModel.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { ...req.body } },
            { new: true }
        );

        return res.status(200).json(employee);
    } catch (error) {

        return res.status(500).json({ message: "Server error", error });
    };
});

module.exports = router;