import ChallengePurchase from '../models/challenges/UserChallenges.js';
import Challenge from '../models/challenges/Challenge.js';
import Question from '../models/challenges/Question.js';
import MultipleChoiceOption from '../models/challenges/MultipleChoiceOption.js';
import ChallengeQuestion from '../models/challenges/ChallengeQuestion.js';

//allow a user to select/purchase a challenge
const selectChallenge = async (req, res) => {
  const { userId } = req.user; // Make sure authentication gets the user's ID
  const { challengeId } = req.body;

  if (!challengeId) {
    return res.status(400).json({
      message: "The field ‘challengeId’ is mandatory.",
    });
  }

  try {
    // Check if the challenge exists
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: 'The challenge does not exist.' });
    }

    // Check if the user has already selected the challenge.
    const existingSelection = await ChallengePurchase.findOne({
      where: { userId, challengeId },
    });

    if (existingSelection) {
      return res.status(400).json({
        message: 'You have already selected this challenge.',
      });
    }

    // Creating the user-challenge relationship
    const userChallenge = await ChallengePurchase.create({
      userId,
      challengeId,
      status: 'not-started',
    });

    res.status(201).json({
      message: 'Challenge successfully selected.',
      userChallenge,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error when selecting the challenge.',
      error,
    });
  }
};

//display all challenges SELECTED/purchased by a user
const getUserChallenges = async (req, res) => {
  try {
      const userId = req.user.userId; 

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
                               attributes: ["id", "optionText"], 
                              },
                          ]
                      }
                  ]
              }
          ]
      });

      if (!userChallenges.length) {
          return res.status(404).json({ message: 'No challenges were found for this user.' });
      }

      res.status(200).json(userChallenges);
  } catch (error) {
      console.error('Error obtaining user challenges:', error);
      res.status(500).json({
          message: 'There was an error in obtaining user challenges.',
          error: error.message,
      });
  }
};

  //allow a user to remove a challenge from their selected challenges
const deleteUserChallenge = async (req, res) => {
    try {
      const userId = req.user.userId; 
      const { challengeId } = req.params; 
  
      
      const userChallenge = await ChallengePurchase.findOne({
        where: {
          userId,
          challengeId,
        },
      });
  
     
      if (!userChallenge) {
        return res.status(404).json({
          message: 'The challenge is not in your list of purchased challenges.',
        });
      }
  
      
      await userChallenge.destroy();
  
      res.status(200).json({
        message: 'The challenge has been removed from your list of purchased challenges.',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'There was an error in trying to remove the challenge.',
        error: error.message,
      });
    }
  };

export { 
    selectChallenge,
    getUserChallenges,
    deleteUserChallenge
 };
