import express from "express";
import {
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  signup,
  dislikePost,
  favoritePost,
  commentPost,
  test,
  deleteComment,
} from "../controller/posts.js";
const router = express.Router();

import requireLogin from "../middleware/loginRequired.js";

router.get("/", requireLogin, getPost);
router.post("/", requireLogin, createPost);
router.patch("/:id", requireLogin, updatePost);
router.delete("/:id", requireLogin, deletePost);
router.patch("/:id/likePost", requireLogin, likePost);
router.patch("/:id/dislikePost", requireLogin, dislikePost);
router.patch("/:id/favoritePost", requireLogin, favoritePost);
router.patch("/:id/commentPost", requireLogin, commentPost);
router.patch("/:id/deleteComment/:commentId",requireLogin, deleteComment);
router.post("/", signup);
router.get("/test", test);

export default router;
