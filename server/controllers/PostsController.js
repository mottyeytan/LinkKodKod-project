import getAllPostsService from '../service/postsService.js';

// GET
export const getAllPostsController = async (req, res) => {
    try{
        const posts = await getAllPostsService();
        
        res.status(200).json({ posts });
        
        
    }catch(err){
        res.status(500).json({ error: err.message });
    }
}