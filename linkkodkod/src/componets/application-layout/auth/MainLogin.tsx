import { useState } from 'react';
import Buttons from "./Buttons.tsx";
import Login from "./login.tsx";
import SignUp from "./signup.tsx";

export default function MainLogin(){
    const [activeMode, setActiveMode] = useState('login');
    const [loading, setLoading] = useState(false);

    const renderActiveComponent = () => {
        switch(activeMode) {
            case 'signup':
                return <SignUp setLoading={setLoading} />;
            default:
                return <Login setLoading={setLoading} />;
        }
    };

    if(loading){
        return (
            <div className="login-componet">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="main-login-componet">
            {renderActiveComponent()}
            <Buttons 
                activeMode={activeMode}
                onModeChange={setActiveMode}
            />
        </div>
    )
}