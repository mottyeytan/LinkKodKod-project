
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../../context/useAuth';
import { useState,useRef} from 'react';
import { FaImage } from 'react-icons/fa';



export default function SignUp({ setLoading }: { setLoading: (loading: boolean) => void }){

    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [username, setUsername] = useState< any>(null);
    const [password, setPassword] = useState< any>(null);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const [imgPreview, setImgPreview] = useState<string | null>(null);

    const [error, setError] = useState('');
    
    const { createUser } = useUsers();

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", username);
        formData.append("password", password);
    
        if (profilePic) {
            formData.append("img", profilePic);
            console.log(" Image added:", profilePic.name);
        } else {
            console.log(" No image selected");
        }

    try {
        await createUser(formData);
        console.log(" createUser succeeded");
        setUsername("");
        setProfilePic(null);
        setImgPreview(null);
        

    } catch (err) {
        console.log(" createUser failed:", err);
    }
        
            
    }





    function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>){
        const file = e.target.files?.[0];
        if (file) {
            console.log(file);
            setImgPreview(URL.createObjectURL(file));
        }}

    return (
        <div className="signup-componet">
            <h1>SignUP</h1>
            <form onSubmit={handleRegister}>
            <input required type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            
            {error && (
                <div className="error-message" style={{color: 'red'}}>{error}</div>
            )}
            <div className={`picture-icon ${imgPreview ? 'has-pic' : ''}`} onClick={()=>!imgPreview && fileInputRef.current?.click()}>
        
        {imgPreview ? (

        <>
        <img className="modal-body-input-file-img" src={imgPreview} alt="selected file" />
        <button type="button" onClick={(e) => {e.stopPropagation(); setImgPreview(null); setProfilePic(null);}}>×</button>
        </>
            ) : (
            <>
            <FaImage />
            <span>Click to add profile picture</span>
        </>
        )}
        <input
            className="modal-body-input-file"
            type="file"
            accept="image/*"
            style={{display:'none'}}
            ref={fileInputRef}
            onChange={(e)=>{handleFileInputChange(e); setProfilePic(e.target.files?.[0] || null)}}
            />
            </div>

            <button type="submit">SignUP</button>
            </form>
        </div>
    )

    
}