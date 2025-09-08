import getAllPostsDAL from '../dal/postsDAl.js';
import getImageDAL from '../dal/postsDAl.js';


export default async function getAllPostsService(){

    try{

        const posts = await getAllPostsDAL()

        return posts
    }catch(e){
        console.log(e)
        return e
    }



}

export default async function getImageService(){

    try{

        const image = await getImageDAL()

        return image
    }catch(e){
        console.log(e)
        return e
    }
}