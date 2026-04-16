const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.connection.on("Connected", () => {
      console.log("====================================");
      console.log("Database Connected");
      console.log("====================================");
    });
    await mongoose.connect(`${process.env.MONGODB_URL}/greencart
      `);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
