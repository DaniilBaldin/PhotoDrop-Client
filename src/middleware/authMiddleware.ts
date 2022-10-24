/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

const secretKey: any = process.env.TOKEN_KEY;

const authMiddleware: RequestHandler = (req: any, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Auth error!' });
        }
        req.person = jwt.verify(token, secretKey);
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Auth error!',
        });
    }
};

export default authMiddleware;
