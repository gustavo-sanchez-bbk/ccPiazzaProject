// This is our routes.js script 

// Required const
const express = require("express");

// We must still create the authController.js script under controllers folder otherwise this will fail
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();

// This is our user registration
router.post("/register", registerUser);

// This is our user login
router.post("/login", loginUser)

module.exports = router; 