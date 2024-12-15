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

export default verifyToken
