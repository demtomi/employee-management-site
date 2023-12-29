const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient

//GET EMPLOYEE
router.get("/", async (req, res) => {
    const response = res;
    console.log(req);

    MongoClient.connect('mongodb://admin:pass@localhost:27017', function (err, client) {
        if (err) throw err;

        const db = client.db('employees');
        const query = { userid: "658eb46c6498aa9ed8558f1f" };
        db.collection('users').findOne(query, function (err, result) {
            if (err) throw err;

            client.close();
            response.send(result);
        })
    });
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

//DELETE AN EMPLOYEE BY ID
router.delete("/:id", async (req, res, next) => {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        if (!employee || employee === null) {
            res.status(204).json({ message: "Employee not found" });
        };

        await employee.delete();

        const result = await EmployeeModel.findById(req.params.id)
        if (!result) {
            return res.status(200).json({ message: "delete successful" });
        } else {
            return res.json({ message: "delete failed" });
        };

    } catch (error) {

        return res.status(500).json({ message: "Server error", error });
    };
});

module.exports = router;