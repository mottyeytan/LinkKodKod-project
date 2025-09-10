import express from 'express';
import path from 'path';
import multer from 'multer';


import  { getAllPostsController, getOnePostController,addPostController }  from '../controllers/PostsController.js' ;



const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
    },
    });
    
const upload = multer({ storage });

router.get('/getPosts', getAllPostsController )
router.get('/getOnePost/:id', getOnePostController )
router.post('/createPost',upload.any(),addPostController )




export default router;