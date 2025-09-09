import {getAllPostsService, getOnePostService} from '../service/postsService.js';

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