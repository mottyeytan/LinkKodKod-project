import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (name) => {
    return jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};