import { getAllPostsDAL ,getOnePostDAL,addPostDAL} from '../dal/postsDAl.js';


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

export async function addPostService(post){
    try{

        const newPost = await addPostDAL(post)
        return newPost
    }catch(e){
        console.log(e)
        return e
    }
}

