import express from 'express';

import { getAllPostsController } from '../controllers/PostsController';


const router = express.Router();


router.get('/getPosts', getAllPostsController)
// router.post('/addPost',)
// router.put('/editPosts',)
// router.delete('/deletePost',)