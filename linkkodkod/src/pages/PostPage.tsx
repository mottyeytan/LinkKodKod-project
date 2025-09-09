import { usePosts } from "../context/usePosts";
import { useParams } from "react-router";
import "../styles/PostPage.css"

export default function PostPage(){

    const {posts} = usePosts();
    const {id} = useParams();

    const index: any = Number(id) - 1

    return (
        <> 

        <div className="post-page-container">
        
        <div className="user-contanier-post-page">

            <div className="name">
                {posts[index]?.username}
            </div>

            <div className="date">
                {posts[index]?.PublishDate}
            </div>

            <div className="pic">
                <img src={"http://localhost:5001/" + posts[index]?.userPic } alt="profile image"/>
            </div>


        </div>

        <div className="post-contanier-post-page">
            <div className="post-content">
                {posts[index]?.content}
            </div>

            <div className="post-picture">
                <img src={"http://localhost:5001/" + posts[index]?.postPic } alt="post image"/>
            </div>
        </div>

        </div>
        </>
    )
    
}