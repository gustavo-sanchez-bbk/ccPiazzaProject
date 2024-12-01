// Here we will be defining our operations for create, read update / delete posts 

const express = require("express");
// Updated for the coursework required schema 
const { createPost, getPosts, interactWithPost, checkPostExpiration } = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// To create posts 
router.post("/create", protect, createPost);
// To get ALL posts 
router.get("/", protect,getPosts);
// To interact with posts 
router.post("/:id/interact", protect, interactWithPost);
// To check and update post Expiration
router.patch("/:id/check", protect, checkPostExpiration);

module.exports = router;