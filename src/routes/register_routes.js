const express = require("express");
const router = express.Router();
const registerControl = require("../controllers/user_control");


///register users
router.post("/", registerControl.register);

//login user and generate token
router.get("/signin", registerControl.signin)

//get all users
router.get("/", registerControl.get_users)

//update by id
router.put("/:id", registerControl.update_user)

//delete by id
router.delete("/:id", registerControl.delete_user_by_id)

//delete all users
router.delete("/", registerControl.delete_users)

module.exports = router;
