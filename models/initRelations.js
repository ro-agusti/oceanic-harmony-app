import Challenge from './challenges/Challenge.js';
import Question from './challenges/Question.js';
import ChallengeQuestion from './challenges/ChallengeQuestion.js';
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
