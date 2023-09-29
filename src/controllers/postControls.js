const PhotoSharing = require("../models/post");

//this is the create function/method
exports.getPhotoShare = async (req, res) => {
  try {
    
    // declarations
    const {name, caption} = req.body;
    // //file storage declared manually and specifies where images should be directed to and saved.
    // const imageUploaded = "http://localhost:3300/images/" + req.file.filename;

    // //this the schema where we call in the declarations.
    // //brief details about image requirements..
    const getSharing = new PhotoSharing({
     name,
     caption
    });

    //.save() - using express functionality
    const getPostUpload = await getSharing.save();
    res.status(201).json(getPostUpload);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getPhotosList = async (_req, res) => {
  try {
    //.find() - finds all courses on the database
    await PhotoSharing.find();

    res.status(200).json("Photos showing!");
  } catch (error) {
    res.status(404).json({ error: "Photos aren't showing!" });
  }
};

//Deleting a post by id: instead of all of them, this function performs exactly that
exports.getDeleteSharedPhotosById = async (req, res) => {
  try {
    const _id = req.params.id;
    await PhotoSharing.findByIdAndRemove(_id);

    res.status(201).json("Removed Successful!");
  } catch (error) {
    res.status(404).json({ error: "Could'nt delete." });
  }
};

//And here, is the functionality that deletes all the posts uploaded which will be implemeted 
//on a later stage.
exports.getDeleteAllSharedPhotos = async (req, res) => {
  try {
    const body = req.body;
    await PhotoSharing.deleteMany({ }, body);

    res.status(201).json("Removed all!");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
