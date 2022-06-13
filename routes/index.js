const express = require("express");

const isLoggedIn = require("../middlewares/authorization");
const authController = require("../controllers/authController");
const mainController = require("../controllers/mainController");

const router = express.Router();

router.get("/", isLoggedIn, mainController.getGroupsOrPersonalTodos);
router.post("/login", authController.login);

module.exports = router;
