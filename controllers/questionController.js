// controllers/questionController.js
import { db } from "../config/database.js";
import Question from "../models/challenges/Question.js";
import MultipleChoiceOption from "../models/challenges/MultipleChoiceOption.js";

const createQuestion = async (req, res) => {
  const { text, description, responseType, options } = req.body;

  // Check that the ‘text’ field is not empty.
  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "The question text is required." });
  }

  // Validate that if multiple-choice, send options
  if (responseType === "multiple-choice" && (!Array.isArray(options) || options.length === 0)) {
    return res.status(400).json({ message: "Multiple-choice questions must have at least one option." });
  }

  try {
    // Check if a question with the same text already exists.
    const existingQuestion = await Question.findOne({ where: { text } });

    if (existingQuestion) {
      return res.status(400).json({ message: "This question already exists." });
    }

    // The allowCustomText is calculated depending on responseType
    const allowCustomText = responseType === "multiple-choice";

    // We use transaction to ensure that the question and options are created together.
    const newQuestion = await db.transaction(async (t) => {
      // Create new question
      const question = await Question.create(
        {
          text,
          description,
          responseType,
          allowCustomText,
        },
        { transaction: t }
      );

      let optionsData = [];

      // If it is a multiple choice, we create the options
      if (responseType === "multiple-choice") {
        optionsData = options.map((option) => ({
          optionText: option.text,
          questionId: question.id,
        }));

        await MultipleChoiceOption.bulkCreate(optionsData, { transaction: t });
      }

      return { question, options: optionsData };
    });

    res.status(201).json({
      message: "Question successfully created.",
      newQuestion: {
        ...newQuestion.question.toJSON(),
        options: newQuestion.options,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating question." });
  }
};

const getAllQuestions = async (req, res) => {
    try {
        // Consult all questions from the database
        const questions = await Question.findAll({
          include: [
            {
              model: MultipleChoiceOption,
             attributes: ["id", "optionText"], 
            },
          ],
        });
        
        
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error in obtaining the questions:', error);
        res.status(500).json({ message: 'Error in obtaining the questions.' });
    }
};

// get the question by ID
const getQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      const question = await Question.findByPk(id, {
        include: [
          {
            model: MultipleChoiceOption,
            attributes: ['id', 'optionText'], 
            required: false, 
          }
        ],
      });
  
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
  
      res.json(question);
    } catch (error) {
      console.error("Error fetching question:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params; // Get question ID from route parameters
        const { text, description, responseType } = req.body; // Get new text from the request body

        // search question by ID
        const question = await Question.findByPk(id);

        if (!question) {
            return res.status(404).json({ message: "Question not found." });
        }

        // We calculate allowCustomText depending on responseType
    const allowCustomText = responseType === "multiple-choice";

    await question.update({
      text,
      description,
      responseType,
      allowCustomText,
    });

    res.json(question);

        res.status(200).json({ message: "Question successfully updated.", question });
    } catch (error) {
        console.error("Error updating the question:", error);

        // Specific handling of uniqueness errors
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ message: "The text of the question must be unique." });
        }

        res.status(500).json({ message: "Error updating the question." });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params; // Get question ID from route parameters

        // Search for the question by its ID
        const question = await Question.findByPk(id);

        if (!question) {
            return res.status(404).json({ message: "Question not found." });
        }

        // Delete question
        await question.destroy();

        res.status(200).json({ message: "Question succesfully deleted" });
    } catch (error) {
        console.error("Error deleting the question:", error);
        res.status(500).json({ message: "Error deleting the question." });
    }
};

  export { 
    createQuestion,
    getAllQuestions, 
    getQuestion,
    updateQuestion, 
    deleteQuestion
   };