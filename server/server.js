require("dotenv").config();
const express = require("express");
const cors = require('cors');

const employeeRouter = require("./routes/employee_route");
const equipmentRouter = require('./routes/equipment_route');

const PORT = 8080

const app = express();
app.use(cors({ origin: "http://localhost:8080" }));

app.use(express.json());
app.use("/api/employees", employeeRouter);
app.use("/api/equipment", equipmentRouter);

const main = async () => {

    app.listen(PORT, () => {
        console.log("App is listening on 8080");
    });
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
