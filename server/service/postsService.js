import getAllPostsDAL from '../dal/postsDAl.js';



export default async function getAllPostsService(){

    try{

        const posts = await getAllPostsDAL()

        return posts
    }catch(e){
        console.log(e)
        return e
    }



}