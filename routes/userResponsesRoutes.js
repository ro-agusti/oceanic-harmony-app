import express from 'express';
import { verifyToken } from '../helpers/middleware/authMiddleware.js';
import { createUserResponse, getUserResponses, deleteUserResponse } from '../controllers/userResponsesController.js'

const router = express.Router();

router.post('/user-responses', verifyToken, createUserResponse);
router.get('/user-responses/:userChallengeId', verifyToken, getUserResponses);
//router.put('/user-responses', verifyToken, updateUserResponse);
router.delete('/user-responses/:userResponseId', verifyToken, deleteUserResponse);

export default router;