const mongoose = require("mongoose");


const connectDB = async () => {
  // database url validation
  if (!process.env.MONGODB_URI) {
    console.error("Please add your Mongo URI to .env file");
    process.exit(1);
  }
  //database connection setup
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
