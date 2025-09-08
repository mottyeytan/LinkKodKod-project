import { usePosts } from "../context/usePosts";
import { useEffect, useState } from "react";
import { type Post } from "../context/PostsService";

export default function PostPage(){

    const {posts, selectedPost} = usePosts()

    const [post, setPost] = useState<Post | null>(null)
    const [postLoading, setPostLoading] = useState<boolean>(false)
    const [postError, setPostError] = useState<string | null>(null)

    console.log("hi ", selectedPost)

   
    function getPost(){
        setPostLoading(true)
        setPostError(null)
        try{
        const postFound = posts.find(post => post.id === Number(selectedPost))
        setPost(postFound || null)
        }catch(error){
            setPostError(error instanceof Error ? error.message : 'An error occurred')
        }finally{
        setPostLoading(false)
        
        }
    }

    useEffect(() => {
        getPost()
    }, [selectedPost])


    console.log("hi", post?.content)

    if(postLoading){
        return <p>Loading post...</p>
    }
    if(postError){
        return <p>Error loading post: {postError}</p>
    }


    return (
        <> 
  
        


        <div className="post-page-container">
        

        <div className="user-contanier-post-page">

            <div className="name">
                {post?.username}
            </div>

            <div className="date">
                {post?.PublishDate}
            </div>

            <div className="pic">
                <img src={post?.userPic } alt="profile image"/>
            </div>




        </div>

        <div className="post-contanier-post-page">
            <div className="post-content">
                {post?.content}
            </div>

            <div className="post-picture">
                <img src={post?.postPic } alt="post image"/>
            </div>
        </div>



        
        </div>


        </>
    )


    
}