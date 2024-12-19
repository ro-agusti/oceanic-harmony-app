import express from 'express';
import { getAllChallenges, createChallenge } from '../controllers/challengeController.js';
import { verifyAdmin } from '../helpers/middleware/authMiddleware.js';

const router = express.Router();

router.get('/challenges', getAllChallenges);

// Rutas para Challenges
router.post('/create', verifyAdmin, createChallenge); // Solo un ADMIN puede crear

export default router;
