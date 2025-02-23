const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = { Tasks };
