const express = require("express");
const router = express.Router();
const registerControl = require("../controllers/user_control");

router.post("/", registerControl.register);
router.delete("/", registerControl.deleteAllUsers);

module.exports = router;
