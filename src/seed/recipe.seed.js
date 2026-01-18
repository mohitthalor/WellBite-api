require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/recipeSchema");
const initData = require("./data");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB (Seeder)");

    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);

    console.log("Data was initialized");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

if (require.main === module) {
  seed();
}
