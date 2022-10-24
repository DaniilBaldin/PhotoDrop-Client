/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const secretKey: any = process.env.TOKEN_KEY;

const generateJWT = (id: any) => {
    const accessToken = jwt.sign(id, secretKey, { expiresIn: '1d' });
    return {
        accessToken,
    };
};
export default generateJWT;
