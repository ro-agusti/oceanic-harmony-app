// controllers/questionController.js
import Question from "../models/challenges/Question.js";

const createQuestion = async (req, res) => {
    const { text } = req.body;
  
    // Verificar que el campo 'text' no esté vacío
    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "The question text is required." });
    }
  
    try {
      // Verificar si ya existe una pregunta con el mismo texto
      const existingQuestion = await Question.findOne({ where: { text } });
  
      if (existingQuestion) {
        return res.status(400).json({ message: "This question already exists." });
      }
  
      // Si no existe, crear la nueva pregunta
      const newQuestion = await Question.create({ text });
      res.status(201).json(newQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating question." });
    }
  };

const getAllQuestions = async (req, res) => {
    try {
        // Consulta todas las preguntas desde la base de datos
        const questions = await Question.findAll();
        
        // Devuelve las preguntas en la respuesta
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        res.status(500).json({ message: 'Error al obtener las preguntas' });
    }
};

const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de la pregunta desde los parámetros de la ruta
        const { text } = req.body; // Obtener el nuevo texto desde el cuerpo de la solicitud

        // Validar que se haya proporcionado el nuevo texto
        if (!text) {
            return res.status(400).json({ message: "El campo 'text' es obligatorio." });
        }

        // Buscar la pregunta por su ID
        const question = await Question.findByPk(id);

        if (!question) {
            return res.status(404).json({ message: "Pregunta no encontrada." });
        }

        // Actualizar el texto de la pregunta
        question.text = text;
        await question.save();

        res.status(200).json({ message: "Pregunta actualizada con éxito.", question });
    } catch (error) {
        console.error("Error al actualizar la pregunta:", error);

        // Manejo específico de errores de unicidad
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ message: "El texto de la pregunta debe ser único." });
        }

        res.status(500).json({ message: "Error al actualizar la pregunta." });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de la pregunta desde los parámetros de la ruta

        // Buscar la pregunta por su ID
        const question = await Question.findByPk(id);

        if (!question) {
            return res.status(404).json({ message: "Pregunta no encontrada." });
        }

        // Eliminar la pregunta
        await question.destroy();

        res.status(200).json({ message: "Pregunta eliminada con éxito." });
    } catch (error) {
        console.error("Error al eliminar la pregunta:", error);
        res.status(500).json({ message: "Error al eliminar la pregunta." });
    }
};

  export { 
    createQuestion,
    getAllQuestions, 
    updateQuestion, 
    deleteQuestion
   };