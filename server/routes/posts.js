import express from 'express';
import {getPost, createPost,updatePost,deletePost,likePost,signup,dislikePost,favoritePost,test} from '../controller/posts.js'
const router = express.Router();

router.get('/',getPost);
router.post('/',createPost);
router.patch('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',likePost);
router.patch('/:id/dislikePost', dislikePost);
router.patch('/:id/favoritePost', favoritePost);
router.post('/',signup);
router.get('/test',test);

export default router;