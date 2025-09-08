import MainPage from './componets/application-layout/MainBackround.tsx' 
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [img, setImg]=useState<any>()

  async function getPosts():Promise<void>{



    const res = await fetch('http://localhost:5001/posts/getPosts')
    const data = await res.json()
    setImg(data.posts[1].postPicture)
    console.log(data.posts[4].postPicture)
    
    return 
  }

  useEffect(()=>{
    getPosts()
  },[])

  return (
    <>
    <MainPage />

    <img src={img} alt="post" />
      
    </>
  )
}

export default App
