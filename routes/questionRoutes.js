// routes/questionRoutes.js
import express from "express";
import { verifyToken, verifyAdmin } from '../helpers/middleware/authMiddleware.js'; // Importar el middleware
import { createQuestion, getAllQuestions, getQuestion, updateQuestion, deleteQuestion } from "../controllers/questionController.js";

const router = express.Router();


router.post("/questions", verifyToken, verifyAdmin, createQuestion);

router.get('/questions', verifyToken, verifyAdmin, getAllQuestions);

router.get('/questions/:id', verifyToken, getQuestion);

router.put("/questions/:id", verifyToken, verifyAdmin, updateQuestion);

router.delete("/questions/:id", verifyToken, verifyAdmin, deleteQuestion);

export default router;
