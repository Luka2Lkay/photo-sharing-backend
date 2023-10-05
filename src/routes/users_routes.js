const express = require("express");
const router = express.Router();
const usersControl = require("../controllers/user_control");

router.post("/register", usersControl.register);
router.post("/login", usersControl.logIn);
router.delete("/", usersControl.deleteAllUsers);
router.get("/allUsers", usersControl.getAllUsers)
router.get("/:id", usersControl.getOneUser)
router.delete("/:id", usersControl.removeOneUser)

module.exports = router;
