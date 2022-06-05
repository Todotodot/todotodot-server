const express = require("express");
const router = express.Router();

const IndexController = require("../controllers/indexController");

router.post("/login", IndexController.login);

module.exports = router;
