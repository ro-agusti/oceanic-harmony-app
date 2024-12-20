import express from 'express';
import { verifyAdmin, verifyToken } from '../helpers/middleware/authMiddleware.js';
import { getAllChallenges, createChallenge, updateChallenge, deleteChallenge, getAllChallengesWithQuestions, getChallengeWithQuestions } from '../controllers/challengeController.js';

const router = express.Router();

router.get('/challenge', getAllChallenges);
router.post('/challenge', verifyToken, verifyAdmin, createChallenge); // Solo un ADMIN puede crear
router.put('/challenge/:id', verifyToken, verifyAdmin, updateChallenge);
router.delete('/challenge/:id', verifyToken, verifyAdmin, deleteChallenge);

// Ruta para obtener todos los challenges con sus preguntas
router.get('/challenge-questions', getAllChallengesWithQuestions);
router.get('/challenge-questions/:challengeId', getChallengeWithQuestions);

export default router;
