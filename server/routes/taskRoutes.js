const express = require("express");
const { saveTask } = require("../controllers/tasksControllers");

const router = express.Router();

router.post("/task", saveTask);

module.exports = router;
