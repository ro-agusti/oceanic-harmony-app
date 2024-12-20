import ChallengeQuestion from "../models/challenges/ChallengeQuestion.js";
import Challenge from "../models/challenges/Challenge.js";
import Question from "../models/challenges/Question.js";

const createChallengeQuestion = async (req, res) => {
  const { challengeId, questionId, week, day, questionCategory } = req.body;

  // Validación para asegurarse de que 'challengeId', 'questionId', 'questionCategory' estén presentes
  if (!challengeId || !questionId || !questionCategory) {
    return res.status(400).json({
      message: "Los campos 'challengeId', 'questionId' y 'questionCategory' son obligatorios.",
    });
  }

  // Validación para asegurarse de que 'questionCategory' esté dentro de las categorías válidas
  const validCategories = ["daily", "daily-reflection", "weekly-reflection", "challenge-reflection"];
  if (!validCategories.includes(questionCategory)) {
    return res.status(400).json({ message: "Categoría de pregunta no válida." });
  }

  // Validación para asegurarse de que al menos uno de 'week' o 'day' esté presente
  if (!week && !day) {
    return res.status(400).json({
      message: "Debes especificar al menos un 'día' o 'semana'.",
    });
  }

  try {
    // Verificar si el challenge y la pregunta existen
    const challenge = await Challenge.findByPk(challengeId);
    const question = await Question.findByPk(questionId);

    if (!challenge) {
      return res.status(404).json({ message: "El desafío no existe." });
    }

    if (!question) {
      return res.status(404).json({ message: "La pregunta no existe." });
    }

    // Crear la carga de ChallengeQuestion
    const newChallengeQuestion = await ChallengeQuestion.create({
      challengeId,
      questionId,
      week,
      day,
      questionCategory,
    });

    res.status(201).json(newChallengeQuestion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cargar la pregunta para el desafío", error });
  }
};

const updateChallengeQuestion = async (req, res) => {
    const { challengeId, questionId } = req.params;
    const { week, day, questionCategory } = req.body; // Los valores que quieres actualizar
  
    // Validación: al menos uno de los campos week, day o questionCategory debe estar presente
    if (!week && !day && !questionCategory) {
      return res.status(400).json({
        message: "Se debe proporcionar al menos un valor para 'week', 'day' o 'questionCategory'.",
      });
    }
  
    try {
      // Buscar la relación ChallengeQuestion
      const challengeQuestion = await ChallengeQuestion.findOne({
        where: { challengeId, questionId },
      });
  
      if (!challengeQuestion) {
        return res.status(404).json({
          message: "No se encontró la relación entre el challenge y la pregunta.",
        });
      }
  
      // Actualizar solo los campos que fueron proporcionados
      const updatedChallengeQuestion = await challengeQuestion.update({
        week: week || challengeQuestion.week,
        day: day || challengeQuestion.day,
        questionCategory: questionCategory || challengeQuestion.questionCategory,
      });
  
      res.status(200).json(updatedChallengeQuestion);
    } catch (error) {
      console.error("Error al actualizar la pregunta del challenge:", error);
      res.status(500).json({ message: "Error al actualizar la pregunta del challenge", error });
    }
  };

const deleteChallengeQuestion = async (req, res) => {
    const { challengeId, questionId } = req.params;
  
    try {
      // Eliminar la relación entre el challenge y la pregunta
      const deleted = await ChallengeQuestion.destroy({
        where: {
          challengeId: challengeId,
          questionId: questionId,
        },
      });
  
      if (deleted === 0) {
        return res.status(404).json({ message: 'No se encontró la relación entre el challenge y la pregunta.' });
      }
  
      res.status(200).json({ message: 'Pregunta eliminada del challenge correctamente.' });
    } catch (error) {
      console.error('Error al eliminar la pregunta del challenge:', error);
      res.status(500).json({ message: 'Error al eliminar la pregunta del challenge', error });
    }
  };


export {
  createChallengeQuestion,
  updateChallengeQuestion,
  deleteChallengeQuestion
};
