import getAllPostsService from '../service/postsService.js';
import getImageService from '../service/postsService.js';

// GET
export const getAllPostsController = async (req, res) => {
    try{

        const posts = await getAllPostsService();
        
        res.status(200).json({ posts });
        
        
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}

export const getImageController = async (req, res) => {
    try{
        const image = await getImageService();
        res.status(200).json({ image });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}