// This is the code for our post controller

// Updated for handling the more complex posts as defined in coursework 
const Post = require("../models/Post");

// Create a post function
const createPost = async (req, res) => {
    try {
        const { title, topics, body, expirationTime } = req.body;
        
        const post = await Post.create({
            title,
            topics,
            body,
            expirationTime,
            owner: req.user.id, 
        });
        
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to getPosts
const getPosts = async (req, res) => {
    try {
        const { topic, highestInterest } = req.query; // Update -  Function to get ALL the posts or post with the highest interest
        let query = {};
        
        // Topic Filters 
        if (topic) {
            query.topics = topic; 
        }
        
        const posts = await Post.find(query)
            .populate("owner", "username") // Populate owner's username
            
        
        if (highestInterest === "true") {
            // Calculate the post with the highest interest
            const highestInterestPost = posts.reduce((max, post) => {
                const interest = post.likes.length + post.dislikes.length;
                return interest > max.interest
                    ? { post, interest }
                    : max;
            }, { post: null, interest: 0 });

            if (!highestInterestPost.post) {
                return res.status(404).json({ message: "No posts found with interest" });
            }

            return res.status(200).json(highestInterestPost.post);
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// The function to get post with highest interests was queried with ChatGPT with the prompt
// how can I add a function to get the most popular posts and copying the current code 

// Interact with Posts function
const interactWithPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { interactionType, content } = req.body;
        
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        
        //Updated - add logic to check if post has expired prior to timenow
        const now = new Date();
        if (post.expirationTime < now) {
            post.status = "Expired";
            await post.save();
        }
        
        if (post.status === "Expired") {
            return res.status(400).json({ message: "You Cannot interact with an expired post" });
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
        
        // Ensure users cannot like their own posts
        if (req.user.id === post.owner.toString() && interactionType === "like") {
            return res.status(400).json({ message: "You cannot like your own post. Haha :P" });
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
        
        const now = new Date();
        if (post.expirationTime < now && post.status === "Live") {
            post.status = "Expired";
            await post.save();
        }
        
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPost, getPosts, interactWithPost, checkPostExpiration };
