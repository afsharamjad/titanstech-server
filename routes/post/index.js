const express = require("express");
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
} = require("../../controllers/post");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

// crete post
router.post("/create-post", authMiddleware, createPost);
// get posts
router.get("/", authMiddleware, getPosts);

//get post
router.get("/:id", authMiddleware, getPost);

//delete post
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
