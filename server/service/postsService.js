import { getAllPostsDAL ,getOnePostDAL} from '../dal/postsDAl.js';


export async function getAllPostsService(){

    try{

        const posts = await getAllPostsDAL()

        return posts
    }catch(e){
        console.log(e)
        return e
    }

}


export async function getOnePostService(id){
    try{
        const post = await getOnePostDAL(id)
        return post
    }catch(e){
        console.log(e)
        return e
    }
}

