import jwt from 'jsonwebtoken';
import Customer from '../models/Customer';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const { login, password } = req.body;

        const user = await Customer.findOne({ where: { login } });

        if (!user)
            return res.status(401).json({ error: { login: 'incorrect' } });
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: { password: 'incorrect' } });
        }

        const { id, name, level, last_login, created_at } = user;

        user.last_login = new Date();

        user.save();

        return res.json({
            user: {
                id,
                name,
                last_login,
                created_at,
            },
            token: jwt.sign({ id, level }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
