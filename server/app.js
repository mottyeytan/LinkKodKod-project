import express from 'express'
import PostRoutes from './routes/postsRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import multer from 'multer';




dotenv.config();

const server = express();

server.use(cors({
    origin: true,
    credentials: true,
    
}));

server.options('*', cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
    },
    });
    const upload = multer({ storage });

server.use("/public", express.static('public' ));


server.use(express.static('public' ));



server.use(express.json());


server.use("/posts", PostRoutes)

const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




