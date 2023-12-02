const express = require("express");
const {
  createPost,
  getPosts,
  getPost,
  deletePost,
  likePost,
  likePostComment,
  commentPost,
  replyPostComment,
  getComments,
  getUserPost,
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

router.post("/like/:id", authMiddleware, likePost);

//comment
router.get("/comments/:postId", authMiddleware, getComments);
router.post("/like-comment/:id/:rid?", authMiddleware, likePostComment);
router.post("/comment/:id", authMiddleware, commentPost); //comment on post
router.post("/reply-comment/:id", authMiddleware, replyPostComment);

router.post("/get-user-post/:id", authMiddleware, getUserPost);

module.exports = router;
