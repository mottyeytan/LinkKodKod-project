import "../../styles/addPost.css"
import { FaImage } from 'react-icons/fa';
import React, { useRef, useState } from 'react';
import { usePosts } from '../../context/usePosts';

export default function AddPostModal({onClose}:{onClose:()=>void}){
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const {createPost, postsLength} = usePosts();
    const [content, setContent] = useState<string>("");
    const [postPic, setPostPic] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];
        if (file) {
            console.log(file);
            setImgPreview(URL.createObjectURL(file));
        }}


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();



        const formData = new FormData();
        formData.append("id", JSON.stringify(postsLength +1))
        formData.append("content", content);
        formData.append("username", "User");
    
        if (postPic) {
            formData.append("img", postPic);
            console.log(" Image added:", postPic.name);
        } else {
            console.log(" No image selected");
        }

    try {
        await createPost(formData);
        console.log(" createPost succeeded");
        setContent("");
        setPostPic(null);
        setImgPreview(null);
        onClose();

    } catch (err) {
        console.log(" createPost failed:", err);
    }
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
        <div className={`picture-icon ${imgPreview ? 'has-pic' : ''}`} onClick={()=>!imgPreview && fileInputRef.current?.click()}>
        
        {imgPreview ? (

        <>
        <img className="modal-body-input-file-img" src={imgPreview} alt="selected file" />
        <button type="button" onClick={(e) => {e.stopPropagation(); setImgPreview(null); setPostPic(null);}}>×</button>
        </>
            ) : (
            <>
            <FaImage />
            <span>Click to add image</span>
        </>
        )}
        <input
            className="modal-body-input-file"
            type="file"
            accept="image/*"
            style={{display:'none'}}
            ref={fileInputRef}
            onChange={(e)=>{handleFileInputChange(e); setPostPic(e.target.files?.[0] || null)}}
            />
            </div>
        <button
        className="publish-button"
        type="submit"
        disabled={isLoading}
        >
        {isLoading ? "Publishing..." : "Publish"}
        </button>
    </form>

    </div>
    </div>
)
}