// This will be our model to manage the posts 

const mongoose = require("mongoose");

// Lets add the schema
const postSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectID,
			ref: "User",
			required: true, 
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String, 
			required: true,
		}, 
	},
	{timestamps:true}
);

module.exports = mongoose.model("Post", postSchema); 