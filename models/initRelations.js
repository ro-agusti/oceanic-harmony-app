import Challenge from './challenges/Challenge.js';
//import { ChallengePurchase } from './challenges/ChallengePurchase.js';
import Question from './challenges/Question.js';
import ChallengeQuestion from './challenges/ChallengeQuestion.js';
//import Response from './challenges/Response.js';
//import MultipleTextOption from './challenges/MultipleTextOption.js';
//import { QuestionResponseType } from './challenges/QuestionResponseType.js';
import { User } from './User.js';
import ChallengePurchase from "./challenges/UserChallenges.js";
import MultipleChoiceOption from './challenges/MultipleChoiceOption.js';

// Configura las relaciones entre modelos
const initRelations = () => {

  //------RELACIONES CHALLENGES

   // Relación entre Challenge y ChallengeQuestion
    Challenge.hasMany(ChallengeQuestion, { foreignKey: 'challengeId' });
    ChallengeQuestion.belongsTo(Challenge, { foreignKey: 'challengeId' });
    
    // Relación entre Question y ChallengeQuestion
    Question.hasMany(ChallengeQuestion, { foreignKey: 'questionId' });
    ChallengeQuestion.belongsTo(Question, { foreignKey: 'questionId' });
    
    //----
    Challenge.belongsToMany(Question, {
      through: ChallengeQuestion,
      foreignKey: 'challengeId',
      otherKey: 'questionId',
      as: 'questions'
  });
  Question.belongsToMany(Challenge, {
    through: ChallengeQuestion,
    foreignKey: 'questionId',
    otherKey: 'challengeId',
    as: 'challenges'
});

    //Challenge.hasMany(Response, { foreignKey: 'challengeId' });
    //Challenge.hasMany(ChallengePurchase, { foreignKey: 'challengeId' });
    
    
    // relaciones modelo challenge purchase
    //User.hasMany(ChallengePurchase, { foreignKey: 'userId' });

  // Relaciones modelo question
  //Question.hasMany(Response, { foreignKey: 'questionId' });
  //Question.hasMany(MultipleTextOption, { foreignKey: 'questionId' });

  // Relaciones modelo response
  //Response.belongsTo(Question, { foreignKey: 'questionId' });
  //Question.hasOne(Response, { foreignKey: "questionId" });
  //Response.belongsTo(Challenge, { foreignKey: 'challengeId' });

  // Relaciones de ChallengeQuestion

  // Relaciones modelo multiple text
//MultipleTextOption.belongsTo(Response, { foreignKey: 'responseId' });

// Relaciones question response type
// Question.hasMany(QuestionResponseType, { foreignKey: 'questionId' });
// QuestionResponseType.belongsTo(Question, { foreignKey: 'questionId' });


//-------Relaciones mulple choice option
Question.hasMany(MultipleChoiceOption, { foreignKey: "questionId" });
MultipleChoiceOption.belongsTo(Question, { foreignKey: "questionId" });

  // --------- RELACIONES USER-CHALLENGE

  User.belongsToMany(Challenge, { through: ChallengePurchase, foreignKey: 'userId' });
Challenge.belongsToMany(User, { through: ChallengePurchase, foreignKey: 'challengeId' });

User.hasMany(ChallengePurchase, { foreignKey: 'userId' });
ChallengePurchase.belongsTo(User, { foreignKey: 'userId' });

Challenge.hasMany(ChallengePurchase, { foreignKey: 'challengeId' });
ChallengePurchase.belongsTo(Challenge, { foreignKey: 'challengeId' });
};

export default initRelations;
