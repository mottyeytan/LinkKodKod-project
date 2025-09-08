import Post from "./Post/MainPost";
import posts from "../../data/posts.json" 
import "../../styles/mainPage.css"


export default function MainPage(){


    return (
        <>
       
        
        

<main className="main-page-contanier">
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

</main>
</>




    )


   


       

    

}