import  Challenge  from '../models/challenges/Challenge.js';
import Question from '../models/challenges/Question.js';
import ChallengeQuestion from '../models/challenges/ChallengeQuestion.js';
//import { QuestionResponseType } from '../models/challenges/QuestionResponseType.js';
import MultipleChoiceOption from '../models/challenges/MultipleChoiceOption.js';

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
        const { title, description, price, days } = req.body;

        // Validación de campos obligatorios
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

        // Respuesta exitosa
        res.status(201).json({
            message: 'Challenge creado exitosamente.',
            challenge,
        });
    } catch (error) {
        console.error('Error al crear el challenge:', error);
        res.status(500).json({ error: 'Error interno al crear el challenge.' });
    }
};

// Controller para editar un challenge
const updateChallenge = async (req, res) => {
    try {
        const { id } = req.params;  // Obtenemos el ID del challenge desde los parámetros de la URL
        const { title, description, price, days } = req.body;

        // Validar que los campos obligatorios no estén vacíos
        if (!title || !description || !price || !days) {
            return res.status(400).json({ error: 'Los campos título, descripción, precio y días son obligatorios.' });
        }

        // Buscar el challenge por su ID
        const challenge = await Challenge.findByPk(id);

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge no encontrado.' });
        }

        // Actualizar los datos del challenge
        challenge.title = title;
        challenge.description = description;
        challenge.price = price;
        challenge.days = days;

        // Guardar los cambios
        await challenge.save();

        res.status(200).json({
            message: 'Challenge actualizado exitosamente.',
            challenge,
        });
    } catch (error) {
        console.error('Error al actualizar el challenge:', error);
        res.status(500).json({ error: 'Error interno al actualizar el challenge.' });
    }
};

// Controller para borrar un challenge
const deleteChallenge = async (req, res) => {
    try {
        const { id } = req.params;  // Obtenemos el ID del challenge desde los parámetros de la URL

        // Buscar el challenge por su ID
        const challenge = await Challenge.findByPk(id);

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge no encontrado.' });
        }

        // Eliminar el challenge
        await challenge.destroy();

        res.status(200).json({
            message: 'Challenge eliminado exitosamente.',
        });
    } catch (error) {
        console.error('Error al eliminar el challenge:', error);
        res.status(500).json({ error: 'Error interno al eliminar el challenge.' });
    }
};

// conseguir los challenge con sus preguntas asociadas
const getAllChallengesWithQuestions = async (req, res) => {
    try {
        // Recuperar todos los challenges con sus preguntas asociadas a través de la tabla intermedia 'ChallengeQuestion'
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
        console.error('Error al obtener los challenges con preguntas:', error);
        res.status(500).json({ message: 'Error al recuperar los challenges con preguntas', error });
    }
};

// conseguir las reguntas asociadas a un challenge
const getChallengeWithQuestions = async (req, res) => {
    const { challengeId } = req.params;
    
    try {
        // Buscar el challenge con sus preguntas y opciones de multiple choice
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
            return res.status(404).json({ message: 'Challenge no encontrado' });
        }
        
        res.status(200).json({ challenge });
    } catch (error) {
        console.error('Error al obtener el challenge con preguntas:', error);
        res.status(500).json({ message: 'Error al obtener el challenge con preguntas', error });
    }
};

// conseguir las preguntas de un challenge
// const getChallengeQuestions = async (req, res) => {
//     const { challengeId } = req.params;

//     try {
//         // Validar si el ID del desafío está presente
//         if (!challengeId) {
//             return res.status(400).json({ error: 'Se requiere el ID del desafío.' });
//         }

//         // Consulta para obtener las preguntas
//         const questions = await ChallengeQuestion.findAll({
//             where: { challengeId },
//             include: [
//                 {
//                     model: Question,
//                     attributes: ['id', 'text', 'questionCategory'],
//                 },
//             ],
//             order: [
//                 ['week', 'ASC'],  // Primero por semana
//                 ['day', 'ASC'],   // Luego por día
//                 [Question, 'questionCategory', 'ASC'], // Finalmente por categoría
//             ],
//         });

//         if (!questions.length) {
//             return res.status(404).json({ message: 'No se encontraron preguntas para este desafío.' });
//         }

//         // Enviar las preguntas como respuesta
//         res.status(200).json(questions);
//     } catch (error) {
//         console.error('Error al obtener las preguntas:', error);
//         res.status(500).json({ error: 'Error al obtener las preguntas del desafío.' });
//     }
// };
export {
    getAllChallenges,
    createChallenge,
    updateChallenge,
    deleteChallenge,
    //getChallengeQuestions,
    getAllChallengesWithQuestions, 
    getChallengeWithQuestions
};
