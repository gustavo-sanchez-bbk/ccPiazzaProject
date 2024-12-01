// This is the code for our post controller

// Updated for handling the more complex posts as defined in coursework 
const Post = require("../models/Post");

// Create a post

const createPost = async (req, res) => {
	try {
		const { title, topics, body, expirationTime } = req.body;
		
		const post = await Post.create({
			title,
			topics,
			body,
			expirationTime,
			owner: req.user.id, // Associated with the authenticated user
		});
		
		res.status(201).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
// Get ALL the posts 
const getPosts = async (req, res) => {
	try {
		const posts = await Post.find().populate("owner", "username"); 
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Interact with Posts 

const interactWithPost = async (req, res) => {
	try {
		const { id } = req.params;
		const { interactionType, content } = req.body;
		
		const post = await Post.findById(id);
		if (!post) return res.status(404).json({ message: "Post not found" });
		
		if (post.status === "Expired") {
			return res.status(400).json({ message: "Cannot interact with an expired post" });
		}
		
		if (interactionType === "like") {
			post.likes.push(req.user.id);
		} else if (interactionType === "dislike") {
			post.dislikes.push(req.user.id);
		} else if (interactionType === "comment") {
			post.comments.push({ user: req.user.id, content });
		} else {
			return res.status(400).json({ message: "Invalid interaction type" });
		}
		
		await post.save();
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

// Check posts expiration time
const checkPostExpiration = async (req, res) => {
	try {
		const { id } = req.params;
		
		const post = await Post.findById(id);
		if (!post) return res.status(404).json({ message: "Post not found" });
		
		if (new Date() > new Date(post.expirationTime)) {
			post.status = "Expired";
			await post.save();
		}
		
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
module.exports = { createPost, getPosts, interactWithPost, checkPostExpiration };