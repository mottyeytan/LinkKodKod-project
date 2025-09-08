import posts  from '../data/posts.json' with { type: 'json' }


export default async function getAllPostsDAL(){

    try{

        return posts 
        
    }catch(e){

        console.log(e)
        return e 
    }
}

