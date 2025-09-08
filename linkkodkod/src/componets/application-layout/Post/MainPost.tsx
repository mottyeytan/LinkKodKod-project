import "../../../styles/post/mainPost.css"

import PostHeader from "./HeaderPost"
import ContentPost from "./ContentPost" 
import ButtonPost from "./ButtomPost"


export default function Post({profileNmae, ProfilePic, postDate, PostTextContent, PostPicture, onClick}:{profileNmae:string,ProfilePic:string,postDate:string,PostTextContent:string,PostPicture:string, onClick:()=>void    }){

    return (

        <div className="Post-container" onClick={onClick}>


        <PostHeader profileName={profileNmae} ProfilePic={ProfilePic} date={postDate} />

        <ContentPost content={PostTextContent} picture={PostPicture} />

        <ButtonPost />






        </div>
    )
}