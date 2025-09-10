import express from 'express';
import path from 'path';
import multer from 'multer';

import { loginController,signupController } from '../controllers/authController.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
    },
    });
    
const upload = multer({ storage });

const router = express.Router();

router.post('/signup',upload.any(), signupController);
router.post('/login', loginController);


export default router;