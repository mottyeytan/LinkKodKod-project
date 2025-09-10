
import "../../styles/navBar.css"

import { useNavigate } from "react-router-dom"

import { useUsers } from "../../context/useAuth";



export default function Navbar(){

    const navigate = useNavigate()

    const { token, name, profilePucture, Logout, setPressedLogoutTrue } = useUsers();



    function HandelLoginButton(){
        navigate("/login")
    }

    function HandelLogoutButton(){
        Logout();
    }

    function HandelSignupButton(){
        setPressedLogoutTrue()
        navigate("/login")


    }
 

    return (

        <div id="nav-bar-container" >

            <div className="logo">
                <img className="logo2" src="logo2.png"></img>
                <img id="logo1" src="logo1.png"></img>

            </div>
            <div className="login-section">
            {token && <div className="user-navbar">

                <p className="username-navbar">
                    {name}

                </p>

                <img src={"http://localhost:5001/"+profilePucture}>
                
                </img>


            </div>}

            
                {(token) ? (<button onClick={HandelLogoutButton}>Logout</button>):(
                    <>
                    <button onClick={HandelLoginButton}>Login</button>
                    <button  onClick={HandelSignupButton}>SignUp</button>
                    </>
                )}
                
                
                
                
                

            </div>



        </div>











    )
}