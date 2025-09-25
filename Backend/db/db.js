const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const connectMongodb = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("mongodb succesfully connected. yay");
  } catch (error) {
    console.log("unable to connect to mongodb", error);
    process.exit(1);
  }
};

module.exports = connectMongodb;
