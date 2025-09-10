import fs from 'fs';
import path from 'path';


const postsFilePath = path.join(process.cwd(), 'data', 'posts.json');


function getPosts() {
    try {
        const data = fs.readFileSync(postsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log( error, "err getting posts");
        return [];
    }
    }

function savePosts(posts) {
    try {
        fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));
        return true;
    } catch (error) {
        console.log('error saving posts:', error);
    return false;
    }
    }

export async function getAllPostsDAL(){
    try{
        return getPosts();
    }catch(e){
        console.log(e)
        return []
        }
        }



export async function addPostDAL(post){
    try{

        const posts = getPosts();
        posts.push(post);
        const saved = savePosts(posts);
        
        if (saved) {
            console.log('Post saved successfully:', post.id);
            return post;
        } else {
            console.log('failed to save post');
            return false;
        }

    }catch(e){
        console.log('error in addPostDAL:', e);
        return false;
    }
    }