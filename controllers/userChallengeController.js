import ChallengePurchase from '../models/challenges/UserChallenges.js';
import Challenge from '../models/challenges/Challenge.js';
import Question from '../models/challenges/Question.js';
import MultipleChoiceOption from '../models/challenges/MultipleChoiceOption.js';
import ChallengeQuestion from '../models/challenges/ChallengeQuestion.js';

//permitir a un usuario seleccionar/comprar un challenge
const selectChallenge = async (req, res) => {
  const { userId } = req.user; // Asegúrate de que la autenticación obtenga el ID del usuario
  const { challengeId } = req.body;

  if (!challengeId) {
    return res.status(400).json({
      message: "El campo 'challengeId' es obligatorio.",
    });
  }

  try {
    // Verificar si el desafío existe
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'El desafío no existe.' });
    }

    // Verificar si el usuario ya seleccionó el desafío
    const existingSelection = await ChallengePurchase.findOne({
      where: { userId, challengeId },
    });

    if (existingSelection) {
      return res.status(400).json({
        message: 'Ya seleccionaste este desafío.',
      });
    }

    // Crear la relación usuario-desafío
    const userChallenge = await ChallengePurchase.create({
      userId,
      challengeId,
      status: 'not-started',
    });

    res.status(201).json({
      message: 'Desafío seleccionado con éxito.',
      userChallenge,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al seleccionar el desafío.',
      error,
    });
  }
};

//mostrar todos los challenges comprados por un usuario
const getUserChallenges = async (req, res) => {
  try {
      const userId = req.user.userId; // Obtenemos el ID del usuario autenticado

      const userChallenges = await ChallengePurchase.findAll({
          where: { userId },
          include: [
              {
                  model: Challenge,
                  attributes: ['id', 'title', 'description', 'price', 'days'],
                  include: [
                      {
                          model: Question,
                          as: 'questions',
                          attributes: ['id', 'text', 'description', 'responseType', 'allowCustomText'],
                          through: {
                              model: ChallengeQuestion,
                              attributes: ['week', 'day', 'questionCategory']
                          },
                          include: [
                              {
                                model: MultipleChoiceOption,
                               attributes: ["id", "optionText"], // Solo traemos los campos necesarios
                              },
                          ]
                      }
                  ]
              }
          ]
      });

      if (!userChallenges.length) {
          return res.status(404).json({ message: 'No se encontraron desafíos para este usuario.' });
      }

      res.status(200).json(userChallenges);
  } catch (error) {
      console.error('Error al obtener los desafíos del usuario:', error);
      res.status(500).json({
          message: 'Hubo un error al obtener los desafíos del usuario.',
          error: error.message,
      });
  }
};

  //permitir a un usuario eliminar un challenge
const deleteUserChallenge = async (req, res) => {
    try {
      const userId = req.user.userId; // Obtenemos el ID del usuario desde el token verificado
      const { challengeId } = req.params; // Obtenemos el ID del desafío desde los parámetros de la ruta
  
      // Buscar el registro en ChallengePurchase
      const userChallenge = await ChallengePurchase.findOne({
        where: {
          userId,
          challengeId,
        },
      });
  
      // Verificar si el registro existe
      if (!userChallenge) {
        return res.status(404).json({
          message: 'El desafío no está en tu lista de desafíos comprados.',
        });
      }
  
      // Eliminar el registro
      await userChallenge.destroy();
  
      res.status(200).json({
        message: 'El desafío ha sido eliminado de tu lista de desafíos comprados.',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Hubo un error al intentar eliminar el desafío.',
        error: error.message,
      });
    }
  };

export { 
    selectChallenge,
    getUserChallenges,
    deleteUserChallenge
 };
