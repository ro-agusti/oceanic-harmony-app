import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const rawHeader = req.header('Authorization');
  const token = rawHeader && rawHeader.startsWith("Bearer ")
    ? rawHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

export {
    verifyToken,
    verifyAdmin
};
