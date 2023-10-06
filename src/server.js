const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

//directory imports for right of use
const { db } = require("./config/db_config");
const postRoutes = require("./routes/post_routes");
const usersRoutes = require("./routes/users_routes");

const app = express();

//will be using this port
const port = 3300;

app.use(express.json());
app.use(cors());

mongoose.connect(db.mongoUrl)
  .then(() => {
    console.log("Connected to APi");
  })
  .catch((error) => {
    console.log("Oops! Connection access denied!", error);
  });

app.use("/post", postRoutes);
app.use("/users", usersRoutes);

app.use("/images", express.static("images"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
