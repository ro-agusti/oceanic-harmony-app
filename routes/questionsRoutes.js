import express from 'express';
import { getChallengeQuestions } from '../controllers/challengeController.js';

const router = express.Router();

// Ruta para obtener las preguntas de un desafío específico
router.get('/:challengeId/questions', getChallengeQuestions);

export default router;
