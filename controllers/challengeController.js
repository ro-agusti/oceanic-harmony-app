import  Challenge  from '../models/challenges/Challenge.js';
import Question from '../models/challenges/Question.js';
import ChallengeQuestion from '../models/challenges/ChallengeQuestion.js';
import MultipleChoiceOption from '../models/challenges/MultipleChoiceOption.js';

// get all the challenges
const getAllChallenges = async (req, res) => {
    try {
        // We obtain all the challenges
        const challenges = await Challenge.findAll();

        // If there are no challenges, we respond with an appropriate message.
        if (challenges.length === 0) {
            return res.status(404).json({ message: 'No challenges available' });
        }

        // If there are challenges, we show them
        res.status(200).json({ challenges });
    } catch (error) {
        console.error('Error in obtaining challenges:', error);
        res.status(500).json({ message: 'Error in obtaining challenges.' });
    }
};

// create challenge from ADMIN
const createChallenge = async (req, res) => {
    
    try {
        const { title, description, price, days } = req.body;

        // Validation of mandatory fields
        if (!title || !description || !price || !days) {
            return res.status(400).json({ error: 'The fields title, description, price and days are mandatory.' });
        }

        // Create the Challenge
        const challenge = await Challenge.create({
            title,
            description,
            price,
            days,
        });

        // Successful response
        res.status(201).json({
            message: 'Challenge successfully created.',
            challenge,
        });
    } catch (error) {
        console.error('Error creating the challenge: ', error);
        res.status(500).json({ error: 'Internal error when creating the challenge.' });
    }
};

// Controller to edit a challenge
const updateChallenge = async (req, res) => {
    try {
        const { id } = req.params;  // Obtain the challenge ID from the URL parameters
        const { title, description, price, days } = req.body;

        // Validate that the required fields are not empty.
        if (!title || !description || !price || !days) {
            return res.status(400).json({ error: 'Los campos título, descripción, precio y días son obligatorios.' });
        }

        // Search the challenge by ID
        const challenge = await Challenge.findByPk(id);

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge no encontrado.' });
        }

        // Update challenge data
        challenge.title = title;
        challenge.description = description;
        challenge.price = price;
        challenge.days = days;

        // Save changes
        await challenge.save();

        res.status(200).json({
            message: 'Challenge successfully updated.',
            challenge,
        });
    } catch (error) {
        console.error('Error updating the challenge:', error);
        res.status(500).json({ error: 'Internal error when updating the challenge.' });
    }
};

// Controller to delete a challenge
const deleteChallenge = async (req, res) => {
    try {
        const { id } = req.params;  // Obtain the challenge ID from the URL parameters

        // Search the challenge by ID
        const challenge = await Challenge.findByPk(id);

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found.' });
        }

        // Remove the challenge
        await challenge.destroy();

        res.status(200).json({
            message: 'Challenge successfully eliminated.',
        });
    } catch (error) {
        console.error('Error deleting the challenge:', error);
        res.status(500).json({ error: 'Internal error while deleting the challenge.' });
    }
};

const getChallengeById = async (req, res) => {
  const { id } = req.params;
  try {
    const challenge = await Challenge.findByPk(id);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge no encontrado" });
    }
    res.json({ challenge });
  } catch (error) {
    console.error("Error al obtener challenge por ID:", error);
    res.status(500).json({ error: "Error interno" });
  }
};

// get all the challenges with their associated questions
const getAllChallengesWithQuestions = async (req, res) => {
    try {
        // Retrieve all challenges with their associated questions through the intermediate table 'ChallengeQuestion'.
        const challenges = await Challenge.findAll({
            include: [
                {
                    model: ChallengeQuestion,
                    attributes: ['week', 'day', 'questionCategory'], 
                    include: [
                        {
                            model: Question,
                            attributes: ['id', 'text', 'description', 'responseType'], 
                            include: [
                                {
                                    model: MultipleChoiceOption,
                                    attributes: ['id', 'optionText'],
                                }
                            ]
                        }
                    ]
                },
            ],
        });
        
        if (!challenges || challenges.length === 0) {
            return res.status(404).json({ message: 'No challenges found' });
        }
        
        res.status(200).json({ challenges });
    } catch (error) {
        console.error('Error getting challenges with questions:', error);
        res.status(500).json({ message: 'Error retrieving challenges with questions', error });
    }
};

// get the questions associated with a challenge
const getChallengeWithQuestions = async (req, res) => {
    const { challengeId } = req.params;
    
    try {
        // Search for the challenge with its questions and multiple choice options.
        const challenge = await Challenge.findOne({
            where: { id: challengeId },
            include: [
                {
                    model: ChallengeQuestion,
                    attributes: ['week', 'day', 'questionCategory'], 
                    include: [
                        {
                            model: Question,
                            attributes: ['id', 'text', 'description', 'responseType'], 
                            include: [
                                {
                                    model: MultipleChoiceOption,
                                    attributes: ['id', 'optionText'],
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        
        res.status(200).json({ challenge });
    } catch (error) {
        console.error('Error in obtaining the challenge with questions:', error);
        res.status(500).json({ message: 'Error getting the challenge with questions', error });
    }
};

export {
    getAllChallenges,
    createChallenge,
    updateChallenge,
    deleteChallenge,
    getChallengeById,
    getAllChallengesWithQuestions, 
    getChallengeWithQuestions
};
