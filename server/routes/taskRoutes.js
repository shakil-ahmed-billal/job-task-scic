const express = require("express");
const { saveTask , getTasks , deleteTasks, updateTasks  } = require("../controllers/tasksControllers");

const router = express.Router();

router.post("/tasks", saveTask);
router.get("/tasks", getTasks);
router.delete("/tasks/:id", deleteTasks);
router.put("/tasks/:id", updateTasks);

module.exports = router;
