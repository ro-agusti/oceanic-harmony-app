import express from 'express';
import { getPurchasedChallenges } from '../controllers/challengePurchaseController.js';
import  { verifyToken }  from '../helpers/middleware/authMiddleware.js'; // Asegúrate de tener el middleware para verificar el token

const router = express.Router();

// Ruta para obtener los challenges comprados por un usuario
router.get('/purchased', verifyToken, getPurchasedChallenges);

export default router;
