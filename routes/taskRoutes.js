const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getTasks, createTask, updateTask, getTaskById, getTasksById, filterTasksByStatus,
} = require('../controller/taskController');

const router = express.Router();

router.get('/', getTasks); // This routes gets all the tasks of all the users(not a protected route)
router.post('/', protect, createTask); // This route creates a new task according to required feature(3)
router.put('/:id', protect, updateTask); // This route edits a task by ID according to required feature(4)
router.get('/userTasks', protect, getTasksById); // This route gives all the tasks a user created according to required feature(5)
router.get('/userTasks/:id', protect, getTaskById); // This route views a task using its ID according to required feature(6)
router.post('/userTasks/status', protect, filterTasksByStatus); // This route filters task by status according to required feature(7)

module.exports = router;