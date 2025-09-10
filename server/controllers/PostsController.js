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
        let content = req.body.content;
        let username = req.body.username; 
        
        let imagePath = null;

        if (req.files && req.files.length > 0) {
            const imageFile = req.files[0];
            imagePath = `/uploads/${imageFile.filename}`;
            }
        
        const newPost = {
            id: req.body.id,
            username: username,
            content: content,
            postPic: imagePath,
            PublishDate: new Date().toISOString(),
        }

        const post = await addPostService(newPost);

        if (post) {
            res.status(201).json({ post, message: "Post created successfully" });
        } else {
            res.status(500).json({ error: "Service returned false" });
        }

    }catch(err){
        res.status(500).json({ error: "Failed to create post" });
    }
    }