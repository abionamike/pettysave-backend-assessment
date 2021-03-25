const Task = require('../model/taskModel');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getTasksById = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user._id });
    res.json(tasks);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await new Task({
      title, user_id: req.user._id, description, status,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.filterTasksByStatus = async (req, res) => {
  try {
    const tasks = await Task.find();

    const filteredTasks = tasks.filter((task) => task.status !== req.body.status);

    res.json(filteredTasks);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};