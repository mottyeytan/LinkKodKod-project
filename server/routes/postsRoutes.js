import express from 'express';

import  { getAllPostsController, getOnePostController }  from '../controllers/PostsController.js' ;

const router = express.Router();


router.get('/getPosts', getAllPostsController )
router.get('/getOnePost/:id', getOnePostController )
// router.post('/addPost',)
// router.put('/editPosts',)
// router.delete('/deletePost',)

export default router;