import express from 'express';
import { verifyToken, verifyAdmin } from '../helpers/middleware/authMiddleware.js'; // Importar el middleware
import { createChallengeQuestion, updateChallengeQuestion, deleteChallengeQuestion } from '../controllers/challengeQuestionController.js';

const router = express.Router();

// Route to create a question associated with a challenge
router.post("/challenge-questions", verifyToken, verifyAdmin, createChallengeQuestion);

// Route to update the details of the question associated with a challenge
router.put('/challenge-questions/:challengeId/:questionId', verifyToken, verifyAdmin, updateChallengeQuestion);

// Route to remove the link between a challenge and a question
router.delete('/challenge-questions/:challengeId/:questionId', verifyToken, verifyAdmin, deleteChallengeQuestion);

export default router;