import "../../../styles/post/ContentPost.css"
import { useState } from "react"



export default function ContentPost({content, picture}:{content:string, picture:string}){


    //i will defind max content lenght 
    const MaxTextContentlen: number = 100

    const LongTextContent: boolean = content ? content.length < MaxTextContentlen : false

    const [isExpanded, setIsExpanded] = useState<boolean>(LongTextContent)



    function HnadelExpand(e:any){
        e.stopPropagation()

        setIsExpanded(!isExpanded)
    }


    return (

        <div className="content-container" > 
        
        <div className={isExpanded ? "long-content": "short-content"}>

            <p className="text-content"> {content}</p>
        </div>
            <button onClick={HnadelExpand} >{isExpanded ? "Read less": "Read more"}</button>

        <div className="picture-content">


            <img src={picture} alt="pictur"></img>
        </div>

        
        </div>
    )
}