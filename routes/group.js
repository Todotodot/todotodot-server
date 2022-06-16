const express = require("express");

const isLoggedIn = require("../middlewares/authorization");
const groupController = require("../controllers/groupController");
const todoController = require("../controllers/todoController");

const router = express.Router();

router.get("/:groupId", isLoggedIn, groupController.getGroup);
router.post("/", isLoggedIn, groupController.createGroup);
router.patch("/:groupId", isLoggedIn, groupController.updateGroup);
router.patch("/:groupId/addMember", isLoggedIn, groupController.updateGroupMember);
router.delete("/:groupId", isLoggedIn, groupController.deleteGroup);

router.post("/:groupId/todos", isLoggedIn, todoController.createTodo);
router.patch("/:groupId/todos/:todoId", isLoggedIn, todoController.updateTodo);
router.patch("/:groupId/todos/:todoId/complete", isLoggedIn, todoController.completeTodo);
router.delete("/:groupId/todos/:todoId", isLoggedIn, todoController.deleteTodo);

module.exports = router;
