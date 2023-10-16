const express = require("express");
const router = express.Router();
const photoSharingControllers = require("../controllers/post_control");
const {upload} = require("../helper_functions/multer")
const verify = require('../middleware/verify')

router.post("/createPost", verify, upload.single("file"),photoSharingControllers.createPost);
router.get("/allPosts", verify, photoSharingControllers.getAllPosts);
router.get("/:id", verify, photoSharingControllers.getPostById);
router.get("/user/posts/:id", verify, photoSharingControllers.getPostByUserId);
router.delete("/:id", verify, photoSharingControllers.deletePostById);
router.delete("/", verify, photoSharingControllers.deleteAllPosts);
router.put("/comment/:id", verify, photoSharingControllers.comment)
router.put("/removeComment/:postId/:commentId", verify, photoSharingControllers.removeComment)
router.put("/like/:id", verify, photoSharingControllers.toggleLike)

module.exports = router;
