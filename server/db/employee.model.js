const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
    name: String,
    age: Number,
    main_office: String,
    position: String,
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
