const express = require("express");
const { Tasks } = require("../models/tasksModels");

const saveTask = async (req, res) => {
  try {
    const { title, email, description, category, timestamp } = req.body;
    const task = await Tasks.create({
      title,
      email,
      description,
      category,
      timestamp,
    });

    if (!task) {
      return res.status(400).json({ message: "Task not created" });
    }
    return res.status(200).send({
      message: "Task created successfully",
      id: task._id,
      title: task.title,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { saveTask };
