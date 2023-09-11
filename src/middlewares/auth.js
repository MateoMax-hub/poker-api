import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()

export const verifyJwt = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'Token no encontrado' })
        jwt.verify(token, process.env.SECRET_WORD);
        next();
    } catch (error) {
        if (error.message === 'jwt expired') return res.status(401).json({ message: 'Token expirado, por favor logearse nuevamente' });
    }
};

export const decodeToken = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'Token no encontrado' })
        const { user } = jwt.verify(token, process.env.SECRET_WORD);
        req.userId = user.id;
        next();
    } catch (error) {
        if (error.message === 'jwt expired') return res.status(401).json({ message: 'Token expirado, por favor logearse nuevamente' });
    }
}

export const decodeVerifyToken = (req, res, next) => {
    try {
        const { token } = req.params;
        if (!token) return res.status(401).json({ message: 'Token no encontrado' })
        const { user } = jwt.verify(token, process.env.SECRET_WORD);
        req.userVerifyToken = user.id;
        next();
    } catch (error) {
        if (error.message === 'jwt expired') return res.status(401).json({ message: 'Token expirado, por favor logearse nuevamente' });
    }
}
