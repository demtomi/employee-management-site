require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const employeeRouter = require("./routes/employees");
const equipmentRouter = require('./routes/equipment');

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
    console.error("Missing MONGO_URL environment variable");
    process.exit(1);
};

const app = express();
app.use(cors({ origin: "http://localhost:8080" }));

app.use(express.json());
app.use("/api/employees", employeeRouter);
app.use("/api/equipment", equipmentRouter);

const main = async () => {
    await mongoose.connect(MONGO_URL);
    console.log("DB Connected");

    app.listen(PORT, () => {
        console.log("App is listening on 8080");
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
