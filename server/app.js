import express from 'express'
import PostRoutes from './routes/postsRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(cors({
    origin: true,
    credentials: true,
    
}));

server.options('*', cors());

server.use(express.static('public'));

server.use(express.json());


server.use("/posts", PostRoutes)

const PORT = process.env.PORT || 3000;


server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});




