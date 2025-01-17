import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) return res.status(401).json({ error: 'Token not provided' });

    const [, token] = bearer.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        req.userId = decoded.id;
        req.userLevel = decoded.level;

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
};
