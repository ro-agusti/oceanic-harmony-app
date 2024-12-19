import express from 'express';
import { verifyToken } from '../helpers/middleware/authMiddleware.js'; // Importar el middleware
import { getUserProfile, registerUser, loginUser } from '../controllers/userController.js'; // Controlador para obtener perfil
//import { User } from '../models/User.js';
//import bcrypt from 'bcryptjs'; // Para encriptar las contraseñas
//import jwt from 'jsonwebtoken'; // Para generar el token

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/signup', registerUser);

// Ruta de login
router.post('/login', loginUser);

// Ruta para obtener el perfil del usuario (protegida por el middleware)
router.get('/profile', verifyToken, getUserProfile);

export default router;
