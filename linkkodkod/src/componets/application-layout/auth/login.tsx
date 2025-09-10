import { useState } from 'react';
import { useUsers } from '../../../context/useAuth';
import type { User } from '../../../context/authService';

import { useNavigate } from 'react-router-dom';


export default function Login({ setLoading }: { setLoading: (loading: boolean) => void }){
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { LoginWithNamePassword, Login } = useUsers();


    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        setLoading(true);
        try{

            const user: User ={
                name: username,
                password:password
            }
            
            const data =  await LoginWithNamePassword(user)

            if(data){
                
                navigate('/');
                setLoading(false);
            } else {
                setError(data.message || 'Invalid username or password');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Invalid username or password');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-componet">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input required type="text" placeholder="Username"  value={username} onChange={(e) => setUsername(e.target.value)} />
                <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                {error && (
                    <div className="error-message" style={{color: 'red'}}>{error}</div>
                )}
            </form>
        </div>
    )
}