const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Routes
router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;