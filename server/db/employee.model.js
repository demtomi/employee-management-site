const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    name: String,
    level: String,
    position: String,
    present: Boolean,
    salary: Number,
    desired_salary: Number,
    division: { type: Schema.Types.ObjectId, ref: "Divisions" },
    equipment: { type: Schema.Types.ObjectId, ref: "Equipment" },
    starting_date: Date,
    address: {
        country: String,
        city: String,
        street: String,
        zip: Number
    },
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
