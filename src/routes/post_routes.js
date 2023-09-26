const express = require("express");
const router = express.Router();

const getPhotoSharing = require("../controllers/postControls");

// upload picture on the platform
router.post("/getSharing", getPhotoSharing.getPhotoShare);

//get the list of all the uploaded pictures
router.get("/getAll", getPhotoSharing.getPhotosList);

//delete by id, is applied here
router.delete("/:id", getPhotoSharing.getDeleteSharedPhotosById);

//removes all the SharedPhotos on the platform.
router.delete("/getRemove", getPhotoSharing.getDeleteAllSharedPhotos);

//Router through the functions user wishes to touch on
module.exports = router;