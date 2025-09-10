import express from 'express'
import PostRoutes from './routes/postsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';




dotenv.config();

const server = express();

server.use(cors({
    origin: true,
    credentials: true,
    
}));

server.options('*', cors());



server.use("/public", express.static('public' ));


server.use(express.static('public' ));



server.use(express.json());


server.use("/posts", PostRoutes)
server.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




