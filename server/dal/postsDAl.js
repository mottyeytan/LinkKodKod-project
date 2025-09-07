import posts from './data/posts.json'


export default async function getAllPostsDAL(){

    try{

        return posts 
        
    }catch(e){

        console.log(e)
        return e 
    }
}