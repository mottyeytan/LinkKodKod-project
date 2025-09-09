import { useState, useContext, useEffect , createContext} from "react";
import { AuthService, type User } from "./authService";
import { useParams } from "react-router";


export interface AuthContextType{

    users: User[];
    loading: boolean;
    error: string | null;
    usersLength: number;
    createUser: (user: User) => Promise<void>;
    login: (user: User) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}:{children : React.ReactNode}){

    const [users, setUsers]= useState<User[]>([])
    const [usersLength, setUsersLength ] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
    const {id} = useParams();

    useEffect(() => {
        async function fetchAllUsers(){
            try {
                setLoading(true);
                setError(null);
                const data = await AuthService.getAllUsers();
                setUsers(Array.isArray(data) ? data : []);
                
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };


        fetchAllUsers();
    }, [refreshTrigger]);


    async function createUser(user: User){
        try {
            await AuthService.createUser(user);
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            console.error('Error creating user', err);
        }
    }


    async function login(user: User){
        try {
            await AuthService.login(user);
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            console.error('Error creating user', err);
        }
    }


    return (
        <AuthContext.Provider value={{ users, loading, error, usersLength, createUser, login }}>
            {children}
        </AuthContext.Provider>
    );

}

export function useUsers() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useUsers must be used within a PostsProvider');
    }
    return context;
}