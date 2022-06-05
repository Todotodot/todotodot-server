const express = require("express");
const isLoggedIn = require("../middlewares/authorization");
const AuthController = require("../controllers/authController");
const IndexController = require("../controllers/indexController");

const router = express.Router();

router.get("/", isLoggedIn, IndexController.readIndex);
router.post("/login", AuthController.login);

module.exports = router;
