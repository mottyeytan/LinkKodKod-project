import { useState, useContext, useEffect , createContext} from "react";
import { PostsService, type Post } from "./PostsService";



export interface PostContextType{

    posts: Post[];
    loading: boolean;
    error: string | null;
    postsLength: number;
    createPost: (post: Post) => Promise<void>;

}


const PostContext = createContext<PostContextType | undefined>(undefined)


export function PostsProvider({children}:{children : React.ReactNode}){

    const [posts, setPosts]= useState<Post[]>([])
    const [postsLength, setPostsLength ] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);


    useEffect(() => {
        async function fetchAllPosts(){
            try {
                setLoading(true);
                setError(null);
                const data = await PostsService.getAllPosts();
                setPosts(Array.isArray(data) ? data : []);
                setPostsLength(data.length);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError(err instanceof Error ? err.message : 'An error occurred');
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };


        fetchAllPosts();
    }, [refreshTrigger]);


    
    async function createPost(post: Post){
        try {
            await PostsService.createPost(post);
            setRefreshTrigger(prev => prev + 1);
        } catch (err) {
            console.error('Error creating post:', err);
        }
    }

    return (
        <PostContext.Provider value={{ posts, loading, error, postsLength, createPost }}>
            {children}
        </PostContext.Provider>
    );


}


export function usePosts() {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error('usePosts must be used within a PostsProvider');
    }
    return context;
}