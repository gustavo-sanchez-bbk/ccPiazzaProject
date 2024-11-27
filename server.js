// Our server.js configuration 

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// For some reason my Mac does not like port 3000 so I can switch here to 5000 if required, or run Bash Script killProcess3000

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});