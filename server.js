// Our server.js configuration 

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Connect the authentication routes 
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");



dotenv.config();
connectDB();

// Use this to parse JSON 
const app = express();
app.use(express.json());

// Connect auth route 
app.use("/api/auth", authRoutes);

// Connect post route
app.use("/api/posts", postRoutes);

// For some reason my Mac does not like port 3000 so I can switch here to 5000 if required, or run Bash Script killProcess3000

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is ready on port ${PORT}`);
});

// Start this app with node server.js in our Terminal Window !