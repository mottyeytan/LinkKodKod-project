import "../../styles/addPost.css"
import {  FaImage } from 'react-icons/fa';
import React, { useRef, useState } from 'react';
import { usePosts } from '../../context/usePosts';




export default function AddPostModal({onClose}:{onClose:()=>void}){

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    // const {createPost, postsLength} = usePosts();
    const [content, setContent] = useState<string>("");
    const [postPic, setPostPic] = useState<File | null>(null);
    
    function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];
        if (file) {
            console.log(file);
            setImgPreview(URL.createObjectURL(file));
            
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();


        // const formData = new FormData(e.target as HTMLFormElement);
        // formData.append("id", JSON.stringify(postsLength + 1));
        // formData.append("username", "test");
        // formData.append("userPic", "test");
        // formData.append("PublishDate", "test");
        // formData.append("content", content);
        // formData.append("postPic", postPic as File);

        // console.log(formData, "formData")

        // createPost(formData);


        const formData=new FormData()

        formData.append("img", postPic );

        const res = await fetch("http://localhost:5001/posts/createPost", {
            method: "POST",
            body: formData,
            });


            const data = await res.json();
            console.log("Server response:", data);


       
    }

   

    return (
        <div className="add-post-container">
            <div className={imgPreview ? "modal-container-bigger" : "modal-container"}> 

                    <button onClick={onClose}>X</button>
                <div className="modal-header">
                    <h1>Add Post</h1>
                </div>

                <form className="modal-body" onSubmit={handleSubmit}>
                    <input className="modal-body-input-text" type="text" value={content} placeholder="whats on your mind?" onChange={(e)=>setContent(e.target.value)} />
                    
                   <div className = "picture-icon" onClick={()=>fileInputRef.current?.click() }>
                    {imgPreview && <img className="modal-body-input-file-img" src={imgPreview} alt="selected file"  />}
                    
                     { imgPreview && <button onClick={()=>setImgPreview(null)}>X</button>}

                    <input className="modal-body-input-file" type="file"  accept="image/*" style={{display:'none'}} ref={fileInputRef} onChange={(e)=>{handleFileInputChange(e); setPostPic(e.target.files?.[0] || null)}}  />
                    
                    

                    < FaImage/> 

                    </div>

                    <button className="publish-button" type="submit">Publish</button>

                </form>

            
                
                
                  
                
                 </div>
        </div>
    )
}