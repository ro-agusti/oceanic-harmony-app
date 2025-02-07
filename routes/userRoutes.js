import express from 'express';
import { verifyToken } from '../helpers/middleware/authMiddleware.js'; // Importar el middleware
import { getUserProfile, registerUser, loginUser } from '../controllers/userController.js'; // Controlador para obtener perfil

const router = express.Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.get('/profile', verifyToken, getUserProfile);

export default router;
