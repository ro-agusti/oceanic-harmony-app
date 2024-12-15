import express from 'express';
import getAllChallenges from '../controllers/challengeController.js';

const router = express.Router();

router.get('/challenges', getAllChallenges);

// Ruta para crear un desafío
//router.post('/createchallenge', createChallenge);

export default router;
