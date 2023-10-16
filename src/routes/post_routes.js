const express = require("express");
const router = express.Router();
const photoSharingControllers = require("../controllers/post_control");
const {upload} = require("../helper_functions/multer")
const verify = require('../middleware/verify')

router.post("/createPost", verify, upload.single("file"),photoSharingControllers.createPost);
router.get("/allPosts", photoSharingControllers.getAllPosts);
router.get("/:id", photoSharingControllers.getPostById);
router.get("/user/posts/:id", photoSharingControllers.getPostByUserId);
router.delete("/:id", photoSharingControllers.deletePostById);
router.delete("/", photoSharingControllers.deleteAllPosts);
// router.put("/comment", photoSharingControllers.comment)
// router.put("/removeComment", photoSharingControllers.uncomment)
router.put("/like/:id", verify, photoSharingControllers.toggleLike)
module.exports = router;
