const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["To-Do", "In Progress", "Done"],
  },
  timestamp: { type: Date, default: Date.now },
});

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = { Tasks };

// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//     title: String,
//     email: String,
//     description: String,
//     category: String,
//     timestamp: Date,
// });

// const Tasks = mongoose.model("Tasks", taskSchema);

// module.exports = { Tasks };
