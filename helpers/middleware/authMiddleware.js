import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {

    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId; // Almacena el ID del usuario en el objeto `req`
        next(); // Continuar con la siguiente función en la cadena de middlewares
    }  catch (error) {
        return res.status(401).json({ message: 'Token no válido' });
    }
};

// Middleware para verificar si el usuario es ADMIN
const verifyAdmin = (req, res, next) => {
    try {
        // Extraer token del encabezado Authorization
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided. Unauthorized.' });
        }

        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Añadir info del usuario al objeto request

        // Verificar rol
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next(); // Usuario es admin, continúa con la siguiente función
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.', error });
    }
};

export {
    verifyToken,
    verifyAdmin
} ;
