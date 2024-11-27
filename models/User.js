// We require mongoose 
const mongoose = require("mongoose");

// We also require bcrypt to convert (hash) passwords into an irreversible string. Bcrypt also adds salting (random data added) to the password making it harder to crack. 
const bcrypt = require("bcrypt");

// Define User Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,  // Meaning this file is Mandatory
      unique: true,   // There can be only one
      trim: true,     // Lets get rid of whitespace
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,  // This is so we dont have MYCOOLnamE@GMAIL.COM which will cause to fail auth
    },
    password: {
      type: String,
      required: true,
      minlength: 6,     // Sets a passwwd to a minimum of 7 characters 
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash passwords
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user-entered password to the hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export User model
module.exports = mongoose.model("User", UserSchema);