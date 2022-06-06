const express = require("express");
const isLoggedIn = require("../middlewares/authorization");
const GroupController = require("../controllers/groupController");

const router = express.Router();

router.post("/", isLoggedIn, GroupController.createGroup);
router.patch("/:groupId", isLoggedIn, GroupController.updateGroup);
router.delete("/:groupId", isLoggedIn, GroupController.deleteGroup);

module.exports = router;
