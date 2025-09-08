import Post from "./Post/MainPost";
import "../../styles/mainPage.css"
import { usePosts } from "../../context/usePosts";
import { useNavigate } from "react-router-dom";


export default function MainPage(){
    const {posts, loading, error,  setselectedPost}= usePosts()
    const navigate = useNavigate()


    return (
        <>

    <main className="main-page-contanier">
        <div className="posts-container">

        {loading && <p>Loading posts...</p>}
        {error && <p>Error loading posts: {error}</p>}

        {Array.isArray(posts) && posts.length > 0 ? (posts.map(post=>(

            <Post 
            key={post.id}
            profileNmae={post.username}
            ProfilePic={post.userPic}
            postDate={post.PublishDate}
            PostTextContent={post.content}
            PostPicture={post.postPic}
            
            onClick ={()=>{
                setselectedPost(post.id)
                navigate(`/post/${post.id}`)
            }}

            />

        ))):( !loading && !error && <p>No posts found.</p>)}

    

        </div>

</main>
</>




    )


   


       

    

}