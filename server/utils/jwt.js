import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (name) => {
    const secret = process.env.JWT_SECRET 
    return jwt.sign({ name }, secret, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET 
    return jwt.verify(token, secret);
};