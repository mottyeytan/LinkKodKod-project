interface ButtonsProps {
    activeMode: string;
    onModeChange: (mode: string) => void;
}

export default function Buttons({ activeMode, onModeChange }: ButtonsProps){

    const renderButtons = () => {
        return (
            <>
                {(activeMode === 'signup') && (
                    <button className="login-button"
                    onClick={() => onModeChange('login')}>
                        back to login
                    </button>
                )}
                
                {(activeMode === 'login') && (
                    <button className="signup-button"
                    onClick={() => onModeChange('signup')}>
                        SignUp
                    </button>
                )}

            </>
        );
    };

    return (
        <div className="buttons-componet">
            {renderButtons()}
        </div>
    )
}



