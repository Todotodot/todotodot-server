const express = require("express");
const isLoggedIn = require("../middlewares/authorization");
const GroupController = require("../controllers/groupController");
const TodoController = require("../controllers/todoController");

const router = express.Router();

router.get("/groups/:groupId/todos", isLoggedIn, GroupController.getGroupTodos);
router.post("/", isLoggedIn, GroupController.createGroup);
router.patch("/:groupId", isLoggedIn, GroupController.updateGroup);
router.delete("/:groupId", isLoggedIn, GroupController.deleteGroup);

router.post("/groups/:groupId/todos", isLoggedIn, TodoController.createTodo);
router.patch("/groups/:groupId/todos/:todoId", isLoggedIn, TodoController.updateTodo);

module.exports = router;
