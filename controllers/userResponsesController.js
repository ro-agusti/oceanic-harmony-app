import UserResponse from "../models/challenges/UserResponse.js";
import  UserChallenges  from "../models/challenges/UserChallenges.js";
import Question from "../models/challenges/Question.js";
import MultipleChoiceOption from "../models/challenges/MultipleChoiceOption.js"; 

// Create a new user response with validations
const createUserResponse = async (req, res) => {
    const { userId } = req.user; 
    const { questionId, challengeId, selectedOptionId, responseText } = req.body;

    try {
        const userChallenge = await UserChallenges.findOne({
            where: { userId, challengeId }
        });

        if (!userChallenge) {
            return res.status(403).json({ message: "You do not have access to this challenge" });
        }

        const questionExists = await Question.findByPk(questionId);
        if (!questionExists) {
            return res.status(404).json({ message: "Question not found" });
        }

        if (selectedOptionId) {
            const optionExists = await MultipleChoiceOption.findByPk(selectedOptionId);
            if (!optionExists) {
                return res.status(400).json({ message: "Invalid selected option" });
            }
        }

        const newResponse = await UserResponse.create({
            userChallengeId: userChallenge.id,
            questionId,
            selectedOptionId,
            responseText,
            
        });

        res.status(201).json({ message: "Successfully created response", response: newResponse });
    } catch (error) {
        console.error("Error creating the response:", error);
        res.status(500).json({ message: "Internal error", error });
    }
};

// Get all user responses
const getUserResponses = async (req, res) => {
    const { userId } = req.user;

    try {
        const responses = await UserResponse.findAll({
            include: [
                {
                    model: Question,
                    attributes: ["text"]
                },
                {
                    model: MultipleChoiceOption,
                    attributes: ["optionText"]
                },
                { 
                    model: UserChallenges, 
                    where: { userId }, 
                    attributes: ["challengeId"] 
                }

            ]
        });

        // If there are no replies, respond with an appropriate message.
        if (!responses || responses.length === 0) {
            return res.status(404).json({ message: "No responses found for the user" });
        }

        // Mapping responses to the expected format
        const formattedResponses = responses.map(response => {
            return {
                responseText: response.responseText,  
                Question: {
                    text: response.Question.text
                },
                MultipleChoiceOption: {
                    optionText: response.MultipleChoiceOption ? response.MultipleChoiceOption.optionText : null
                },
                UserChallenges: {
                    challengeId: response.UserChallenges ? response.UserChallenges.id : null  // Safely access userChallenge
                }
            };
        });

        res.status(200).json(formattedResponses, );
    } catch (error) {
        console.error("Error in obtaining answers:", error);
        res.status(500).json({ message: "Internal error", error });
    }
};

// Modificar una respuesta del usuario
const updateUserResponse = async (req, res) => {
    const userId = req.user.id;
    const { responseId } = req.params;
    const { selectedOptionId, responseText } = req.body;

    try {
        // 🔹 Buscar la respuesta
        const response = await UserResponse.findByPk(responseId, {
            include: [{ model: UserChallenges, where: { userId }, attributes: ["id"] }]
        });

        if (!response) {
            return res.status(404).json({ message: "Respuesta no encontrada o no tienes acceso" });
        }

        // 🔹 Validar opción de multiple choice (si aplica)
        if (selectedOptionId) {
            const optionExists = await MultipleChoiceOption.findByPk(selectedOptionId);
            if (!optionExists) {
                return res.status(400).json({ message: "Opción seleccionada inválida" });
            }
        }

        // 🔹 Actualizar respuesta
        response.selectedOptionId = selectedOptionId || response.selectedOptionId;
        response.responseText = responseText || response.responseText;
        await response.save();

        res.status(200).json({ message: "Respuesta actualizada", response });
    } catch (error) {
        console.error("Error al actualizar respuesta:", error);
        res.status(500).json({ message: "Error interno", error });
    }
};

export {
    createUserResponse,
    getUserResponses,
    //updateUserResponse
}