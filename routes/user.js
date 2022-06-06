const express = require("express");
const isLoggedIn = require("../middlewares/authorization");
const TodoController = require("../controllers/todoController");

const router = express.Router();

router.post("/todos", isLoggedIn, TodoController.createTodo);
router.patch("/todos/:todoId", isLoggedIn, TodoController.updateTodo);
router.delete("/users/todos/:todoId", isLoggedIn, TodoController.deleteTodo);

module.exports = router;
