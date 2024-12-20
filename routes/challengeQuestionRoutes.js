import express from 'express';
import { verifyToken, verifyAdmin } from '../helpers/middleware/authMiddleware.js'; // Importar el middleware
import { createChallengeQuestion, updateChallengeQuestion, deleteChallengeQuestion } from '../controllers/challengeQuestionController.js';

const router = express.Router();

// Ruta para crear una pregunta asociada a un desafío
router.post("/challenge-questions", verifyToken, verifyAdmin, createChallengeQuestion);

// Ruta para actualizar los detalles de la pregunta asociada a un challenge
router.put('/challenge-questions/:challengeId/:questionId', verifyToken, verifyAdmin, updateChallengeQuestion);

// Ruta para eliminar la relación entre un challenge y una pregunta
router.delete('/challenge-questions/:challengeId/:questionId', verifyToken, verifyAdmin, deleteChallengeQuestion);

export default router;