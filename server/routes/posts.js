import express from 'express';
import {getPost, createPost,updatePost,deletePost,likePost,signup} from '../controller/posts.js'
const router = express.Router();

router.get('/',getPost);
router.post('/',createPost);
router.patch('/:id',updatePost)
router.delete('/:id',deletePost);
router.patch('/:id/likePost',likePost);
router.post('/',signup)

export default router;