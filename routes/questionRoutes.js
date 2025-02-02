// routes/questionRoutes.js
import express from "express";
import { verifyToken, verifyAdmin } from '../helpers/middleware/authMiddleware.js'; // Importar el middleware
import { createQuestion, getAllQuestions, getQuestion, updateQuestion, deleteQuestion } from "../controllers/questionController.js";

const router = express.Router();

// Ruta para crear una nueva pregunta
router.post("/questions", verifyToken, verifyAdmin, createQuestion);

//ruta para ver que el ADMIN pueda acceder a todas las preguntas
router.get('/questions', verifyToken, verifyAdmin, getAllQuestions);

//ruta para ver preguntas por id
router.get('/questions/:id', verifyToken, getQuestion);

// Ruta para modificar una pregunta
router.put("/questions/:id", verifyToken, verifyAdmin, updateQuestion);

// Ruta para eliminar una pregunta
router.delete("/questions/:id", verifyToken, verifyAdmin, deleteQuestion);

export default router;
