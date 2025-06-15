import ChallengeQuestion from "../models/challenges/ChallengeQuestion.js";
import Challenge from "../models/challenges/Challenge.js";
import Question from "../models/challenges/Question.js";

const createChallengeQuestions = async (req, res) => {
  const { challengeId, questions } = req.body;

  if (!challengeId || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({
      message: "Se requiere 'challengeId' y un array no vacío 'questions'.",
    });
  }

  const validCategories = ["daily", "daily-reflection", "weekly-reflection", "challenge-reflection"];

  try {
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "El challenge no existe." });
    }

    // Validar que todas las preguntas existan y tengan categoría válida
    for (const q of questions) {
      const { questionId, questionCategory, week, day } = q;

      if (!questionId || !questionCategory) {
        return res.status(400).json({
          message: "Cada pregunta debe tener 'questionId' y 'questionCategory'.",
        });
      }

      if (!validCategories.includes(questionCategory)) {
        return res.status(400).json({
          message: `Categoría inválida en una pregunta: ${questionCategory}`,
        });
      }

      if (!day) {
        return res.status(400).json({
          message: "Cada pregunta debe especificar al menos un 'day'.",
        });
      }

      const question = await Question.findByPk(questionId);
      if (!question) {
        return res.status(404).json({
          message: `La pregunta con id ${questionId} no existe.`,
        });
      }
    }

    // Crear las ChallengeQuestions
    const createdQuestions = [];
    for (const q of questions) {
      const { questionId, questionCategory, week, day } = q;

      const newChallengeQuestion = await ChallengeQuestion.create({
        challengeId,
        questionId,
        week,
        day,
        questionCategory,
      });

      createdQuestions.push(newChallengeQuestion);
    }

    res.status(201).json({ message: "Preguntas asignadas correctamente.", createdQuestions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al asignar preguntas", error });
  }
};

const updateChallengeQuestion = async (req, res) => {
    const { challengeId, questionId } = req.params;
    const {  day, questionCategory } = req.body; 
  
    // Validation: at least one of the fields week, day or questionCategory must be present
    if (!day && !questionCategory) {
      return res.status(400).json({
        message: "At least one value must be provided for 'day' or 'questionCategory'.",
      });
    }
  
    try {
      // Search for the ChallengeQuestion relationship
      const challengeQuestion = await ChallengeQuestion.findOne({
        where: { challengeId, questionId },
      });
  
      if (!challengeQuestion) {
        return res.status(404).json({
          message: "The relationship between the challenge and the question was not found.",
        });
      }
  
      // Update only the fields that were provided
      const updatedChallengeQuestion = await challengeQuestion.update({
        week: week || challengeQuestion.week,
        day: day || challengeQuestion.day,
        questionCategory: questionCategory || challengeQuestion.questionCategory,
      });
  
      res.status(200).json(updatedChallengeQuestion);
    } catch (error) {
      console.error("Error updating the challenge question:", error);
      res.status(500).json({ message: "Error updating the challenge question", error });
    }
  };

const deleteChallengeQuestion = async (req, res) => {
    const { challengeId, questionId } = req.params;
  
    try {
      // Eliminate the relationship between the challenge and the question
      const deleted = await ChallengeQuestion.destroy({
        where: {
          challengeId: challengeId,
          questionId: questionId,
        },
      });
  
      if (deleted === 0) {
        return res.status(404).json({ message: 'The relationship between the challenge and the question was not found.' });
      }
  
      res.status(200).json({ message: 'Pregunta eliminada del challenge correctamente.Question eliminated from the challenge correctly.' });
    } catch (error) {
      console.error('Error when removing the question from the challenge:', error);
      res.status(500).json({ message: 'Error when removing the question from the challenge:', error });
    }
  };


export {
  createChallengeQuestions,
  updateChallengeQuestion,
  deleteChallengeQuestion
};
