const express = require("express");
const isLoggedIn = require("../middlewares/authorization");
const AuthController = require("../controllers/authController");
const MainController = require("../controllers/mainController");

const router = express.Router();

router.get("/", isLoggedIn, MainController.getGroupsOrPersonalTodos);
router.post("/login", AuthController.login);

module.exports = router;
