import MainPage from './componets/application-layout/MainBackround.tsx'
import { Route, Routes, useLocation } from 'react-router-dom' 
import Navbar from "./componets/application-layout/Navbar";
import PostPage from "./pages/PostPage";
import LoginPage from './pages/LoginPage.tsx';
import { PostsProvider } from './context/usePosts.tsx';

import './App.css'


function App() {
  const location = useLocation();
  const showNavBar = location.pathname !== '/login';

 
  return (
    <>
    <PostsProvider>
     {showNavBar && <Navbar />}


     <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/login" element={<LoginPage />} />
     </Routes>


     </PostsProvider>

    
      
    </>
  )
}

export default App
