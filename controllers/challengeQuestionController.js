import ChallengeQuestion from "../models/challenges/ChallengeQuestion.js";
import Challenge from "../models/challenges/Challenge.js";
import Question from "../models/challenges/Question.js";

const createChallengeQuestion = async (req, res) => {
  const { challengeId, questionId, week, day, questionCategory } = req.body;

  // Validation to ensure that 'challengeId', 'questionId', 'questionCategory' are present
  if (!challengeId || !questionId || !questionCategory) {
    return res.status(400).json({
      message: "Los campos 'challengeId', 'questionId' y 'questionCategory' son obligatorios.",
    });
  }

  // validation to make sure that 'questionCategory' is within the valid categories
  const validCategories = ["daily", "daily-reflection", "weekly-reflection", "challenge-reflection"];
  if (!validCategories.includes(questionCategory)) {
    return res.status(400).json({ message: "Categoría de pregunta no válida." });
  }

  // Validation to make sure that at least one of 'day' is present
  if ( !day) {
    return res.status(400).json({
      message: "You must specify at least one 'day'.",
    });
  }

  try {
    // Check if the challenge and the question exist
    const challenge = await Challenge.findByPk(challengeId);
    const question = await Question.findByPk(questionId);

    if (!challenge) {
      return res.status(404).json({ message: "The challenge does not exist." });
    }

    if (!question) {
      return res.status(404).json({ message: "The question does not exist." });
    }

    // Create ChallengeQuestion upload
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
    res.status(500).json({ message: "Error loading challenge question", error });
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
  createChallengeQuestion,
  updateChallengeQuestion,
  deleteChallengeQuestion
};
