const express = require("express");
const isLoggedIn = require("../middlewares/authorization");
const TodoController = require("../controllers/todoController");

const router = express.Router();

router.post("/todos", isLoggedIn, TodoController.createTodo);
router.patch("/todos/:todoId", isLoggedIn, TodoController.updateTodo);

module.exports = router;
