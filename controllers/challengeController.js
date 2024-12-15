import  Challenge  from '../models/Challenge.js';

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
    const { title, description, price, days } = req.body;

    // Validar que todos los campos estén completos
    if (!title || !description || !price || !days) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos requeridos.' });
    }

    try {
        const challenge = await Challenge.create({ title, description, price, days });
        res.status(201).json({ message: 'Desafío creado con éxito', challenge });
    } catch (error) {
        console.error('Error al crear el desafío:', error);
        res.status(500).json({ message: 'Error al crear el desafío' });
    }
};

export default getAllChallenges;
