const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://metidjiabdou32_db_user:syGwrFqOqjeLmWH0@cluster0.8vufr2a.mongodb.net/akshop?retryWrites=true&w=majority"
    );

    console.log("MongoDB Connected ✔");
  } catch (error) {
    console.error("Database Error:", error);
  }
};

module.exports = connectDB;
