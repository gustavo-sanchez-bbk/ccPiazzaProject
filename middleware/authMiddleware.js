//  Our Middleware will ensuer that only specific users can perform specific actions

const jwt = require("jsonwebtoken")

const protect = (req,res,next) => {
	let token;
	// Validate Authorisation header
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		try {
			//Extract the token from the header
			token = req.headers.authorization.split("")[1];
			
			
			// I cannot for the life of me get the tokens to work so lets add logging 
			console.log("Authorization Header:", req.headers.authorization);
			console.log("Decoded Token:", decoded);
			
			//Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET); 
			
			// Attach user info 
			req.user = decoded.id;
		
			
			next();
			
		} catch (error) {
			res.status(401).json({message: "Not authorised, Invalid Token"});
		}
	}
	
	if (!token) {
		res.status(401).json({ message: "Not authorised. Invalid Token"});	
	}
};




module.exports = protect; 