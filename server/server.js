const express = require("express");
const cors = require('cors');
const { MongoClient } = require('mongodb')

const PORT = 5000;

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const uri = 'mongodb://admin:pass@localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//GET EMPLOYEE
app.get('/employees', async (req, res) => {
    try {
        await client.connect();

        const database = client.db('employees');
        const collection = database.collection('employee');

        const employees = await collection.find({}).toArray();

        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        // Close the connection
        client.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});