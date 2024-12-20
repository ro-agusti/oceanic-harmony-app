import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Guardar toda la información del usuario en `req.user`
        next();  // Continuar con la siguiente función en la cadena de middlewares
    } catch (error) {
        return res.status(401).json({ message: 'Token no válido' });
    }
};

// Middleware para verificar si el usuario es ADMIN
const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {  // Acceder al rol directamente desde `req.user`
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();  // Continuar con la siguiente función
};

export {
    verifyToken,
    verifyAdmin
} ;
