// @ts-ignore
const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");

// get all posts
router.get("/getPosts", postController.getPosts);

// create a new post
router.post("/createPost", postController.createPost);

// update a post
router.put("/updatePost/:postId", postController.updatePost);

// delete a post
router.delete("/deletePost/:userId/:postId", postController.deletePost);

module.exports = router;
