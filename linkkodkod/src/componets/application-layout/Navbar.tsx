
import "../../styles/navBar.css"

import { useNavigate } from "react-router-dom"


export default function Navbar(){

    const navigate = useNavigate()


    function HandelLoginButton(){
        navigate("/login")
    }
 

    return (

        <div id="nav-bar-container" >

            <div className="logo">
                <img className="logo2" src="logo2.png"></img>
                <img id="logo1" src="logo1.png"></img>

            </div>

            <div className="login-section">

                <button onClick={HandelLoginButton}>Login</button>
                <button>SignUp</button>

            </div>



        </div>











    )
}