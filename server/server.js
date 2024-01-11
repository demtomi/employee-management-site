require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");

const { MONGO_URL, PORT = 5000 } = process.env;

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
}

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// GET REQUEST FOR EMPLOYEES
app.get("/employees", async (req, res) => {
    const employees = await EmployeeModel.find();
    try {
        res.json(employees)
    } catch (error) {
        console.log(error);
    }
});

// GET REQUEST FOR EQUIPMENT
app.get("/equipment", async (req, res) => {
    const equipment = await EquipmentModel.find();
    try {
        res.json(equipment)
    } catch (error) {
        console.log(error);
    }
});

const main = async () => {
    await mongoose.connect(MONGO_URL);
    console.log("DB Connected")

    app.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});