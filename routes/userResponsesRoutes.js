import express from 'express';
import { verifyToken } from '../helpers/middleware/authMiddleware.js';
import { createUserResponse, getUserResponses, updateUserResponse } from '../controllers/userResponsesController.js'

const router = express.Router();

router.post('/user-responses', verifyToken, createUserResponse);
router.get('/user-responses', verifyToken, getUserResponses);
//router.put('/user-responses', verifyToken, updateUserResponse);

export default router;