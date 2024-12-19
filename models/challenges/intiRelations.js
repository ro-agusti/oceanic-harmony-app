import Challenge from './Challenge.js';
import { ChallengePurchase } from './ChallengePurchase.js';
import Question from './Question.js';
import ChallengeQuestion from './ChallengeQuestion.js';
import Response from './Response.js';
import MultipleTextOption from './MultipleTextOption.js';
import { QuestionResponseType } from './QuestionResponseType.js';
import { User } from '../User.js';

// Configura las relaciones entre modelos
const initRelations = () => {
   // Relaciones modelo challenge
    Challenge.hasMany(ChallengeQuestion, { foreignKey: 'challengeId' });
    ChallengeQuestion.belongsTo(Challenge, { foreignKey: 'challengeId' });
    Challenge.hasMany(Response, { foreignKey: 'challengeId' });
    
    // relaciones modelo challenge purchase
    User.hasMany(ChallengePurchase, { foreignKey: 'userId' });
    Challenge.hasMany(ChallengePurchase, { foreignKey: 'challengeId' });

  // Relaciones modelo question
  Question.hasMany(ChallengeQuestion, { foreignKey: 'questionId' });
  Question.hasMany(Response, { foreignKey: 'questionId' });
  Question.hasMany(MultipleTextOption, { foreignKey: 'questionId' });

  // Relaciones modelo response
  Response.belongsTo(Question, { foreignKey: 'questionId' });
  Response.belongsTo(Challenge, { foreignKey: 'challengeId' });

  // Relaciones de ChallengeQuestion
  ChallengeQuestion.belongsTo(Question, { foreignKey: 'questionId' });

  // Relaciones modelo multiple text
MultipleTextOption.belongsTo(Response, { foreignKey: 'responseId' });

// Relaciones question response type
Question.hasMany(QuestionResponseType, { foreignKey: 'questionId' });
QuestionResponseType.belongsTo(Question, { foreignKey: 'questionId' });

  // Más relaciones aquí si es necesario...
};

export default initRelations;
