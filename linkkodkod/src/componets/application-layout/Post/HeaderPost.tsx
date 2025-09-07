

import "../../../styles/post/PostHeader.css"

export default function PostHeader({profileName, ProfilePic ,date}:{profileName:string, ProfilePic:string ,date:string}){


    return (

        <div className="post-header-contanier">

            <div className="post-profile-picture">


                <img   src={ProfilePic} alt="profile image" /> 
            </div>

            <div className="name-and-date" >

               <h1 className="profile-name"> {profileName}</h1>
               <h2 className="date"> {date} </h2>
            </div>

            <div className="menu-button" >

                <button >section </button>
            </div>

            
            
            
            
            
            










        </div>

    )
}