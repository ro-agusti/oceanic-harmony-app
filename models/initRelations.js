import Challenge from './challenges/Challenge.js';
import Question from './challenges/Question.js';
import ChallengeQuestion from './challenges/ChallengeQuestion.js';
import { User } from './User.js';
import ChallengePurchase from "./challenges/UserChallenges.js";
import MultipleChoiceOption from './challenges/MultipleChoiceOption.js';
import UserResponse from './challenges/UserResponse.js';
import UserChallenges from './challenges/UserChallenges.js';

// Configura las relaciones entre modelos
const initRelations = () => {

  //------RELACIONES CHALLENGES

   // Relación entre Challenge y ChallengeQuestion
    Challenge.hasMany(ChallengeQuestion, { foreignKey: 'challengeId' });
    
    // Relación entre Question y ChallengeQuestion
    Question.hasMany(ChallengeQuestion, { foreignKey: 'questionId' });
    ChallengeQuestion.belongsTo(Question, { foreignKey: 'questionId' });
    ChallengeQuestion.belongsTo(Challenge, { foreignKey: 'challengeId' });
    
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

Challenge.belongsToMany(Question, { through: ChallengeQuestion, foreignKey: 'challengeId' });
Question.belongsToMany(Challenge, { through: ChallengeQuestion, foreignKey: 'questionId' });

// Defining relationships (initRelations)
UserResponse.belongsTo(UserChallenges, {
  foreignKey: "userChallengeId", 
  onDelete: "CASCADE", 
});

UserResponse.belongsTo(Question, {
  foreignKey: "questionId", 
});

UserResponse.belongsTo(MultipleChoiceOption, {
  foreignKey: "selectedOptionId",
  // onDelete: "SET NULL",
  // onUpdate: "CASCADE",
});
UserResponse.belongsTo(User, { foreignKey: "userId" }); // <-- Definimos la relación con User

// Defining reverse associations
UserChallenges.hasMany(UserResponse, { foreignKey: "userChallengeId" });
Question.hasMany(UserResponse, { foreignKey: "questionId" });
MultipleChoiceOption.hasMany(UserResponse, { foreignKey: "selectedOptionId" });

User.hasMany(UserResponse, { foreignKey: 'userId'});

export default initRelations;
