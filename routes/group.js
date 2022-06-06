const express = require("express");

const isLoggedIn = require("../middlewares/authorization");
const GroupController = require("../controllers/groupController");
const TodoController = require("../controllers/todoController");

const router = express.Router();

router.post("/", isLoggedIn, GroupController.createGroup);
router.patch("/:groupId", isLoggedIn, GroupController.updateGroup);
router.delete("/:groupId", isLoggedIn, GroupController.deleteGroup);

router.get("/:groupId/todos", isLoggedIn, TodoController.getGroupTodos);
router.post("/:groupId/todos", isLoggedIn, TodoController.createTodo);
router.patch("/:groupId/todos/:todoId", isLoggedIn, TodoController.updateTodo);
router.delete("/:groupId/todos/:todoId", isLoggedIn, TodoController.deleteTodo);

module.exports = router;
