// This is our AuthController 

const User = require("../models/User"); 
const jwt = require("jsonwebtoken"); 

// Register a new user 
const registerUser = async (req, res) => {
	const {username,email,password} = req.body;
	
	try {
		const userExists = await User.findOne({email}); 
		if (userExists){
			return res.status(400).json({message: "This user already existst"});
		}
		
		const user = await User.create({username, email, password});
		
		res.status(201).json({
			id: user._id,
			username: user.username,
			email: user.email,
			token: generateToken(user._id),
			
		});
		
	} catch (error) {
		res.status(500).json({message:error.message});
	}
}; 

// Function to login as an existing user 

const loginUser = async(req,res) => {
	const {email,password} = req.body;
	
	try {
		const user = await User.findOne({email});
		if (!user) {
			return res.status(400).json({message:"Sorry, Invalid Username"});
		}
		
		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			return res.status(400).json({message:"Sorry, Invalid Password"})
		}
		
		res.status(200).json({
			id: user._id,
			username: user.username,
			email: user.email,
			token: generateToken(user._id),
		}) ;
	} catch (error) {
		res.status(500).json({message: error.message});
	}
} ; 


// Function to generate our Token 

const generateToken = (id) => {
	// Added error handling 
	if (!process.env.JWT_SECRET){
		throw new Error("JWT_SECRET is not defined!")
	}
	return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
}; 

module.exports = {registerUser, loginUser}; 