import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

export function verifyToken(token: any) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        console.error('Invalid token:', error.message);
        return null;
    }
}
