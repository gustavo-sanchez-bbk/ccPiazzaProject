//  Our Middleware will ensuer that only specific users can perform specific actions

const jwt = require("jsonwebtoken")

const protect = (req,res,next) => {
	let token;
	
	if (req.headers.authorization && req.headers.authorization.startswith("Bearer")) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.JTW_SECRET); 
			
			req.user = decoded 
			// Attach user info 
			
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