const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { db } = require("./config/db_config");

const postRoutes = require("./routes/post_routes");
const registerRoutes = require("./routes/register_routes");

const app = express();

const port = 3300;

app.use(express.json());
app.use(cors());

mongoose
  .connect(db.mongoUrl)
  .then(() => {
    console.log("You are connected");
  })
  .catch((error) => {
    console.log("Oops! You are not connected!", error);
  });

app.use("/post", postRoutes);
app.use("/register", registerRoutes);

app.use("/images", express.static("images"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
