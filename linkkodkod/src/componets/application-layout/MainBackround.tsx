import Post from "./Post/MainPost";
import posts from "../../data/posts.json" 
import "../../styles/mainPage.css"
import Navbar from "./Navbar";


export default function MainPage(){


    return (
        <>
        <Navbar />
        
        


    <div className="posts-container">

        {posts.map(post=>(

            <Post 
            key={post.id}
            profileNmae={post.profileNmae}
            ProfilePic={post.profilePic}
            postDate={post.date}
            PostTextContent={post.postTextContent}
            PostPicture={post.postPicture}

            />

        ))}

    

        </div>
</>




    )


   


       

    

}