const express = require("express");

const isLoggedIn = require("../middlewares/authorization");
const todoController = require("../controllers/todoController");

const router = express.Router();

router.post("/todos", isLoggedIn, todoController.createTodo);
router.patch("/todos/:todoId", isLoggedIn, todoController.updateTodo);
router.patch("/todos/:todoId/complete", isLoggedIn, todoController.completeTodo);
router.delete("/todos/:todoId", isLoggedIn, todoController.deleteTodo);

module.exports = router;
