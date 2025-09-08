import express from 'express'
import PostRoutes from './routes/postsRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';




dotenv.config();

const server = express();

server.use(cors({
    origin: true,
    credentials: true,
    
}));

server.options('*', cors());


server.use(express.static(path.join(process.cwd(),'public' )));



server.use(express.json());


server.use("/posts", PostRoutes)

const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




