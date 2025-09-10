import { useState, useContext, useEffect , createContext} from "react";
import { AuthService, type User } from "./authService";
import { data, useParams } from "react-router-dom";


export interface AuthContextType{

    users: User[];
    loading: boolean;
    error: string | null;
    usersLength: number;
    createUser: (user: FormData) => Promise<void>;
    // Login: (Newtoken: string, name:string, profilePic:string) => any;
    LoginWithNamePassword: (user: User) => Promise<any>;
    token: string | null;
    profilePucture: string | any;
    name: string | null;
    Logout: () => void;
    LogOutPressed:boolean;
    setPressedLogoutTrue: ()=> void 
    setPressedLogoutFalse: ()=> void 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}:{children : React.ReactNode}){

    const [token, setToken] = useState<string | null>(null);
    const [profilePucture, setProfilePicure] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)
    const[LogOutPressed, setLogOutPressed] = useState<boolean>(false)


    const [users, setUsers]= useState<User[]>([])
    const [usersLength, setUsersLength ] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    
    const {id} = useParams();


    console.log(profilePucture, "cehck")
    console.log(name, "cekc name")
    console.log(token, "cehcl token")




    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedName = localStorage.getItem("name")
        const savedPic = localStorage.getItem("profilePic")
    

        if(savedToken || savedName ||savedPic ){
            setToken(savedToken);
            setName(savedName);
            setProfilePicure(savedPic)
            
        }
        
        setIsLoading(false);
    
    }, []);

    async function LoginWithNamePassword(user: User){
        try{
            const data = await AuthService.login(user);
            setRefreshTrigger(prev => prev + 1);


            if(data){

                console.log(data.user, "cjeck user")

                const name = data.user.name

                const pic = data.user.profilePic

                setToken(data.token);
                setProfilePicure(pic)
        
                setName(name)

                localStorage.setItem('token', data.token)
                localStorage.setItem('name', name)
                localStorage.setItem('profilePic', pic)


                // Login(data.token, data.user.name, data.user.profilePic)

                console.log(typeof data.user.profilePic, "check")
            }
            
            return data
        }catch(e){
            console.log(e)
        }
    }



    function Logout(){
        setToken(null);
        setProfilePicure(null)
        setName(null)
        
        localStorage.removeItem('token');
        localStorage.removeItem('name')
        localStorage.removeItem('profilePic')
        

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


    function setPressedLogoutTrue(){
        setLogOutPressed(true)
    }

    function setPressedLogoutFalse(){
        setLogOutPressed(false)
    }



    return (
        <AuthContext.Provider value={{ users, loading, error, usersLength, createUser,  LoginWithNamePassword, token , profilePucture, name, Logout,setPressedLogoutTrue, setPressedLogoutFalse, LogOutPressed}}>
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