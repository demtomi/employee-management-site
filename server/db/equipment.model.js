const mongoose = require("mongoose");
const { Schema } = mongoose;

const EquipmentSchema = new Schema({
    name: String,
    type: String,
    amount: Number,
    assigned_to: String,
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
});

module.exports = mongoose.model("Equipment", EquipmentSchema);
