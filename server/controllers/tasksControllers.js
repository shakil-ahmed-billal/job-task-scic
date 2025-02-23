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

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    if (!tasks) {
      return res.status(400).json({ message: "Tasks not found" });
    }
    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
  }
};

const deleteTasks = async (req, res) => {
  try {
    const result = await Tasks.deleteOne({ _id: req.params.id });
    if (!result) {
      return res.status(400).json({ message: "Tasks not found" });
    }
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
const updateTasks = async (req, res) => {
  try {
    const result = await Tasks.updateOne({ _id: req.params.id }, req.body);
    if (!result) {
      return res.status(400).json({ message: "Tasks not found" });
    }
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { saveTask, getTasks, deleteTasks, updateTasks };
