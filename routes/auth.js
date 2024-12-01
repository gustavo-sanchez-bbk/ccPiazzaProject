// This is our auth.js script 

// Required const
const express = require("express");

// Add express validator for post validation 
const {check,validationResult} = require("express-validator");

// We must still create the authController.js script under controllers folder otherwise this will fail
const { registerUser, loginUser } = require("../controllers/authController");
const router = express.Router();

// Validation rules for registering

router.post(
	"/register",
	[
		check("username", "A username is required").not().isEmpty(),
		check("email", "Please enter a valid email address").isEmail(),
		check("password", "Password must be 6 or more characters").isLength({min:6}),
	],
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}
		next();
	},
	registerUser
);


// Attach the middleware to posts 
const protect = require("../middleware/authMiddleware")


// This is our user login
router.post("/login", loginUser)

// Attach the postController 
const {createPost} = require("../controllers/postController")
router.post("/create", protect, createPost);

module.exports = router; 