require("dotenv").config();

const db = {
  mongoUrl: process.env.DB,
};

module.exports = { db };
