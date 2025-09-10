import { useState, useContext, useEffect , createContext} from "react";
import { AuthService, type User } from "./authService";
import { useParams } from "react-router";


export interface AuthContextType{

    users: User[];
    loading: boolean;
    error: string | null;
    usersLength: number;
    createUser: (user: FormData) => Promise<void>;
    Login: (Newtoken: string, name:string, profilePic:string) => any;
    LoginWithNamePassword: (user: User) => Promise<any>;
    token: string | null;
    profilePucture: string | any;
    name: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}:{children : React.ReactNode}){

    const [token, setToken] = useState<string | null>(null);
    const [profilePucture, setProfilePicure] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)


    const [users, setUsers]= useState<User[]>([])
    const [usersLength, setUsersLength ] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    
    const {id} = useParams();


    useEffect(() => {
        const savedToken = localStorage.getItem('token');
    

        if(savedToken  ){
            setToken(savedToken);
            
        }
        
        setIsLoading(false);
    
    }, []);

    async function LoginWithNamePassword(user: User){
        try{
            const data = await AuthService.login(user);
            setRefreshTrigger(prev => prev + 1);

            if(data){
                Login(data.token, data.user.name, data.user.profilePic)
            }
            
            return data
        }catch(e){
            console.log(e)
        }
    }


    function Login(Newtoken: string, name:string, profilePic:string){
        setToken(Newtoken);
        setProfilePicure("http://localhost:5001/" + profilePic)
        setName(name)

        console.log("hi login")


        localStorage.setItem('token', Newtoken);
       
    }

    function Logout(){
        setToken(null);
        setProfilePicure(null)
        setName(null)
        
        localStorage.removeItem('token');
        

    }


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


    async function createUser(user: FormData){
        try {
            await AuthService.createUser(user);
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            console.error('Error creating user', err);
        }
    }


    


    return (
        <AuthContext.Provider value={{ users, loading, error, usersLength, createUser, Login, LoginWithNamePassword, token , profilePucture, name}}>
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