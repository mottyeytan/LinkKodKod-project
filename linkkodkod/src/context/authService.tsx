const BASE_URL= "http://localhost:5001/auth/";


export interface User {

    name: string;
    password: string

}


export class AuthService{
    

    static async getAllUsers(): Promise<User[]> {
        
        try{
            const response = await fetch(`${BASE_URL}getPosts`  );
            const data = await response.json();

            if(!response.ok){
                throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
            }

            return data.posts || [];
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }



    static async createUser(user: FormData): Promise<any> {
        
        try{
            const response = await fetch(`${BASE_URL}signup`, {
                method: 'POST',
                body: user
            });
            const data = await response.json();
            console.log(data, "data")

            if(!response.ok){
                throw new Error('Failed to create user');
            }

            return data;
        } catch (error) {
            console.error('Error creating user', error);
            throw error;
        }

    }

    static async login(user: User): Promise<any> {
        
        try{
            const response = await fetch(`${BASE_URL}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            

            if(!response.ok){
                throw new Error('Failed to login user');
            }

            return data;
        } catch (error) {
            console.error('Error login user', error);
            throw error;
        }

    }

}