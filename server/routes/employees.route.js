const express = require('express');
const router = express.Router();
const EmployeeModel = require("../db/employee.model");


// GET REQUEST FOR EMPLOYEES
router.get("/employees", async (req, res) => {
    const employees = await EmployeeModel.find();
    try {
        console.log("123");
        res.json(employees)
    } catch (error) {
        console.log(error);
        console.log("123");
    }
});

// //GET REQUEST BY ID
// router.get("/:id", async (req, res) => {
//     const employee = await EmployeeModel.findById(req.params.id);
//     return res.json(employee);
// });

// //POST REQUEST
// router.post("/", async (req, res, next) => {
//     const employee = req.body;

//     try {
//         const saved = await EmployeeModel.create(employee);
//         return res.json(saved);
//     } catch (err) {
//         console.log(err.message);
//         return next(err);
//     }
// });

// //UPDATE BY ID
// router.patch("/:id", async (req, res, next) => {
//     try {
//         const employee = await EmployeeModel.findOneAndUpdate(
//             { _id: req.params.id },
//             { $set: { ...req.body } },
//             { new: true }
//         );
//         return res.json(employee);
//     } catch (err) {
//         console.log(err.message);
//         return next(err);
//     }
// });

// //DELETE BY ID
// router.delete("/:id", async (req, res, next) => {
//     try {
//         const employee = await EmployeeModel.findById(req.params.id);
//         const deleted = await employee.delete();
//         return res.json(deleted);
//     } catch (err) {
//         console.log(err.message);
//         return next(err);
//     }
// });

module.exports = router;