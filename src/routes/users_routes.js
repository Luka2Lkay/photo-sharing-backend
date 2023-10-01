const express = require("express");
const router = express.Router();
const registerControl = require("../controllers/user_control");

router.post("/register", registerControl.register);
router.post("/login", registerControl.logIn);
router.delete("/", registerControl.deleteAllUsers);

module.exports = router;
