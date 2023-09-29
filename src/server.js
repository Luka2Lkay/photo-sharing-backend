const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const postRoutes = require("./routes/post_routes");
const app = express();

//specify our "P.o.r.t" here.
const port = 3300;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1/Photo_Sharing")
  .then(() => {
    console.log("Connected to APi");
  })
  .catch((error) => {
    console.log("Oops! Connection access denied!", error);
  });

app.use("/post", postRoutes);
//not used yet
//app.use("/images", express.static("images"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});