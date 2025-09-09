const BASE_URL= "http://localhost:5001/posts/";


export interface Post {

    id: number;
    username: string;
    userPic: any;
    PublishDate:string;
    content:string;
    postPic: any;

}


export class PostsService{
    

    static async getAllPosts(): Promise<Post[]> {
        
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


    static async getOnePost(id: number): Promise<Post> {
        
        try{
            
            const response = await fetch(`${BASE_URL}getOnePost/${id}`)
            const data = await response.json();


            if(!response.ok){
                throw new Error('Failed to fetch post');
            }

            return data.posts || [];
        } catch (error) {
            console.error('Error fetching post:', error);
            throw error;
        }
        
    }


    static async createPost(post: FormData): Promise<any> {
        
        try{
            const response = await fetch(`${BASE_URL}createPost`, {
                method: 'POST',
                body: post
            });
            const data = await response.json();
            console.log(data, "data")

            if(!response.ok){
                throw new Error('Failed to create post');
            }

            return data;
        } catch (error) {
            console.error('Error creating post', error);
            throw error;
        }

    }














}