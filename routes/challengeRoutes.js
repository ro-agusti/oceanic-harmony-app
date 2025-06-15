import express from 'express';
import { verifyAdmin, verifyToken } from '../helpers/middleware/authMiddleware.js';
import { getAllChallenges, createChallenge, updateChallenge, deleteChallenge, getChallengeById, getAllChallengesWithQuestions, getChallengeWithQuestions } from '../controllers/challengeController.js';

const router = express.Router();

router.get('/challenge', getAllChallenges);
router.post('/challenge', verifyToken, verifyAdmin, createChallenge); // Solo un ADMIN puede crear
router.put('/challenge/:id', verifyToken, verifyAdmin, updateChallenge);
router.delete('/challenge/:id', verifyToken, verifyAdmin, deleteChallenge);
router.get('/challenge/:id', verifyToken, verifyAdmin, getChallengeById);
// Route to get all the challenges with your questions
router.get('/challenge-questions', getAllChallengesWithQuestions);
router.get('/challenge-questions/:challengeId', getChallengeWithQuestions);

export default router;
