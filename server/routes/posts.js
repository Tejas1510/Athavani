import express from 'express';
import {getPost, createPost,updatePost,deletePost,likePost,signup, dislikePost} from '../controller/posts.js'
const router = express.Router();

router.get('/',getPost);
router.post('/',createPost);
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',likePost);
router.patch('/:id/dislikePost', dislikePost)
router.post('/',signup);

export default router;