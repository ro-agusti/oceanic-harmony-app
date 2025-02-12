import express from 'express';
import { selectChallenge , getUserChallenges, deleteUserChallenge } from '../controllers/userChallengeController.js';
import { verifyToken } from '../helpers/middleware/authMiddleware.js';

const router = express.Router();

router.post('/user-challenges', verifyToken, selectChallenge);
router.get('/user-challenges', verifyToken, getUserChallenges);
router.delete('/user-challenges/:challengeId', verifyToken, deleteUserChallenge);



export default router;
