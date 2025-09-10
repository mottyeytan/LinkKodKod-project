import { useState } from "react"
import "../../../styles/post/buttonPost.css"


export default function ButtonPost(){

    const [liked, setliked] = useState<boolean>(false)


    function HnadelLike(e:any){
        e.stopPropagation()
        setliked(!liked)
    }

    
    
    
    return (

        <div className="button-post-container">

            <div className="response">

                <button >response</button>
            </div>

            <div className="share">


                <button >share</button>

            </div>

            <div className="like">


                <button onClick={HnadelLike}>{liked ? "❤️" : "🤍" }</button>

            </div>











        </div>



    )
}