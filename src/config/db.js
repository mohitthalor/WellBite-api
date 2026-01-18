const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    
    await mongoose.connect("mongodb+srv://mohitthalor13:cN3njcFUa4grvfSl@cluster0.aftekel.mongodb.net/?appName=Cluster0");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
