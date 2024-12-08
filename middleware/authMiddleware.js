// Our middleware will ensure that only authorised users access specific posts / logins /etc 
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      console.log("Authorization Header:", req.headers.authorization); // Debugging
      console.log("Extracted Token:", token); // Debugging

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded); // Debugging

      // Attach user ID to request
      req.user = { id: decoded.id };

      next(); // Proceed to next middleware or route handler
    } catch (error) {
      console.error("Token Verification Error:", error.message); // Log specific error
      res.status(401).json({ message: "Not authorised, Invalid Token" });
    }
  } else {
    res.status(401).json({ message: "Not authorised, no token" });
  }
};

module.exports = protect;
