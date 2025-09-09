import {getAllPostsService, getOnePostService, addPostService} from '../service/postsService.js';

// GET
export const getAllPostsController = async (req, res) => {
    try{

        const posts = await getAllPostsService();
        
        res.status(200).json({ posts });
        
        
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const getOnePostController = async (req, res) => {
    try{
        const {id} = req.params;
        const post = await getOnePostService(parseInt(id));
        res.status(200).json({ post });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const addPostController = async (req, res) => {
    try{
        const username = req.body.username;
        const userPic = req.body.userPic;
        const PublishDate = req.body.PublishDate;
        const content = req.body.content;
        const postPic = req.postPic;

        upload.single('postPic')(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
        });

        const newPost = {
            username,
            userPic,
            PublishDate,
            content,
            postPic
        }
        const post = await addPostService(newPost);


        res.status(200).json({ post, message: "Post added successfully" });
    }catch(err){
        res.status(500).json({ error: err.message, message: "Post not added" });
    }
}