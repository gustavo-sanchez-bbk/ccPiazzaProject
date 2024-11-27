// Our connection to Mongoose will go here 

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    //Log connection messages here 
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Could not connect:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
