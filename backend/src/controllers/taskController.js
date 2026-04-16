const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      user: req.user.userId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// GET ALL TASKS (for logged-in user)
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // check ownership
    if (task.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
