// This is the code for our post controller

const Post = require("../models/Post");

// Create a post

const createPost = async (req,res) => {
	try {
		const {title, content} = req.body;
		
		const post = await Post.create({
			user: req.user.id,
			title,
			content,
			
		});
		
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
}; 