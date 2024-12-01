// This will be our model to manage the posts 

const mongoose = require("mongoose");

// Updated Schema to Coursework specific requirements 
const postSchema = new mongoose.Schema(
	{
		title: { type: String, required: true},
		topics: [{ type: String, enum: ["Politics", "Health", "Sport", "Tech"], required: true }],
		body: { type: String, required: true},
		expirationTime: { type: Date, required: true},
		status: { type: String, enum: ["Live", "Expired"], default: "Live"},
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
		likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
		dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
		comments: [
			{
				user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
				content: { type: String, required: true },
				createdAt: { type: Date, default: Date.now },
			},
		],
	},
	{ timestamps: true} 
);

module.exports = mongoose.model("Post", postSchema);
