import "../../../styles/post/mainPost.css"

import PostHeader from "./HeaderPost"
import ContentPost from "./ContentPost" 
import ButtonPost from "./ButtomPost"


export default function Post({profileNmae, ProfilePic, postDate, PostTextContent, PostPicture}:{profileNmae:string,ProfilePic:string,postDate:string,PostTextContent:string,PostPicture:string    }){

    return (

        <div className="Post-container">


        <PostHeader profileName={profileNmae} ProfilePic={ProfilePic} date={postDate} />

        <ContentPost content={PostTextContent} picture={PostPicture} />

        <ButtonPost />






        </div>
    )
}