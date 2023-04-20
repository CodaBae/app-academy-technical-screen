const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

// Get task route
router.get('/', authMiddleware, async (req, res) => {

  try {
    const tasks = await Task.findAll({
      where: {
        userId: parseInt(req.user.id),
      },
    });

    res.json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Post task route
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title } = req.body;

    const task = await Task.create({
      title,
      userId: parseInt(req.user.id),
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Edit task route
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, completed } = req.body;
    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        userId: parseInt(req.user.id),
      },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.completed = completed === undefined ? task.completed : completed;

    await task.save();

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete task route
router.delete('/:id', authMiddleware,  async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: {
        id,
        userId: parseInt(req.user.id),
      },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;