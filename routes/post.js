// Here we will be defining our operations for create, read update / delete posts 

const express = require("express");
const {createPost, getPosts } = require("../controllers/postController") // Dont forget to add postcontroller.js when copmpleted 
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// To create posts 
router.post("/create", protect, createPost);
// To get ALL posts 
router.get("/", protect,getPosts);

module.exports = router;