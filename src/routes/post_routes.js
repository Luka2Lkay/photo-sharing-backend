const express = require("express");
const router = express.Router();
const photoSharingControllers = require("../controllers/post_control");
const {upload} = require("../helper_functions/multer")

// router.post("/createPost", upload.single("file"),photoSharingControllers.createPost);
router.post("/createPost", photoSharingControllers.createPost);
router.get("/allPosts", photoSharingControllers.getAllPosts);
router.get("/:id", photoSharingControllers.getPostById);
router.get("/user/posts/:id", photoSharingControllers.getPostByUserId);
router.delete("/:id", photoSharingControllers.deletePostById);
router.delete("/", photoSharingControllers.deleteAllPosts);

module.exports = router;
