const express = require("express");
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient

const employeeRouter = require("./routes/employee_route");
const equipmentRouter = require('./routes/equipment_route');

const PORT = 5000;

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

//GET EMPLOYEE
app.get("/api/employees", async (req, res) => {
    const response = res;

    MongoClient.connect('mongodb://admin:pass@localhost:27017', function (err, client) {
        if (err) throw err;

        const db = client.db('employees');
        const query = { userid: 1 };
        db.collection('employee').findOne(query, function (err, result) {
            if (err) throw err;

            client.close();
            response.send(result);
            console.log(result)
        })
    });
});

// app.use("/api/employees", employeeRouter);
app.use("/api/equipment", equipmentRouter);

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
});