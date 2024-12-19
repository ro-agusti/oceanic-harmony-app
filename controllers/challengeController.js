import  Challenge  from '../models/challenges/Challenge.js';
import ChallengeQuestion from '../models/challenges/ChallengeQuestion.js';
import { QuestionResponseType } from '../models/challenges/QuestionResponseType.js';

// conseguir todos los challenge
const getAllChallenges = async (req, res) => {
    try {
        // Obtenemos todos los challenges
        const challenges = await Challenge.findAll();

        // Si no hay challenges, respondemos con un mensaje adecuado
        if (challenges.length === 0) {
            return res.status(404).json({ message: 'No hay challenges disponibles' });
        }

        // Si hay challenges, los mostramos
        res.status(200).json({ challenges });
    } catch (error) {
        console.error('Error al obtener los challenges:', error);
        res.status(500).json({ message: 'Error al obtener los challenges' });
    }
};

//para crear challenge desde ADMIN
const createChallenge = async (req, res) => {
    try {
        const { title, description, price, days, questions } = req.body;

        // Validar campos principales
        if (!title || !description || !price || !days) {
            return res.status(400).json({ error: 'Los campos título, descripción, precio y días son obligatorios.' });
        }

        // Crear el Challenge
        const challenge = await Challenge.create({
            title,
            description,
            price,
            days,
        });

        // Validar si hay preguntas asociadas
        if (questions && Array.isArray(questions)) {
            for (const questionData of questions) {
                const { text, responseTypes } = questionData;

                // Crear la pregunta vinculada al Challenge
                const question = await ChallengeQuestion.create({
                    text,
                    challengeId: challenge.id,
                });

                // Asociar tipos de respuesta (si existen)
                if (responseTypes && Array.isArray(responseTypes)) {
                    for (const responseType of responseTypes) {
                        await QuestionResponseType.create({
                            questionId: question.id,
                            responseType, // Debe ser 'multiple-choice', 'text', 'multiple-text'
                        });
                    }
                }
            }
        }

        res.status(201).json({
            message: 'Challenge creado exitosamente.',
            challenge,
        });
    } catch (error) {
        console.error('Error al crear el challenge:', error);
        res.status(500).json({ error: 'Error interno al crear el challenge.' });
    }
};

// conseguir las preguntas de un challenge
export const getChallengeQuestions = async (req, res) => {
    const { challengeId } = req.params;

    try {
        // Validar si el ID del desafío está presente
        if (!challengeId) {
            return res.status(400).json({ error: 'Se requiere el ID del desafío.' });
        }

        // Consulta para obtener las preguntas
        const questions = await ChallengeQuestion.findAll({
            where: { challengeId },
            include: [
                {
                    model: Question,
                    attributes: ['id', 'text', 'questionCategory'],
                },
            ],
            order: [
                ['week', 'ASC'],  // Primero por semana
                ['day', 'ASC'],   // Luego por día
                [Question, 'questionCategory', 'ASC'], // Finalmente por categoría
            ],
        });

        if (!questions.length) {
            return res.status(404).json({ message: 'No se encontraron preguntas para este desafío.' });
        }

        // Enviar las preguntas como respuesta
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        res.status(500).json({ error: 'Error al obtener las preguntas del desafío.' });
    }
};

export {
    getAllChallenges,
    createChallenge
};
