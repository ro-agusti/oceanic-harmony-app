import { DataTypes } from 'sequelize';
import { db } from '../../config/database.js';
// import { User } from '../User.js';
import  Challenge  from './Challenge.js';
import Question from './Question.js';

const ChallengeQuestion = db.define('ChallengeQuestion', {
    challengeId: {
        type: DataTypes.UUID,
        references: { 
            //model: () => import('./Challenge.js').then(module => module.default),  
            //model: Challenge,
            model: 'challenges',
            key: 'id' },
        allowNull: false,
    },
    questionId: {
        type: DataTypes.UUID,
        references: { 
            //model: () => import('./Question.js').then(module => module.default), 
            // model: Question,
            model: 'questions',
            key: 'id' },
        allowNull: false,
    },
    week: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    day: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1, // Evita valores de día no válidos
          },
    },
    questionCategory: {
        type: DataTypes.ENUM(
          "daily",
          "daily-reflection",
          "weekly-reflection",
          "challenge-reflection"
        ),
        allowNull: false,
      },
}, {
    tableName: 'challenge_questions',
    timestamps: false,
    hooks: {
        beforeValidate: (challengeQuestion) => {
          if (challengeQuestion.day) {
            challengeQuestion.week = Math.ceil(challengeQuestion.day / 7);
          }
        },
      },
});

// Relaciones
// ChallengeQuestion.belongsTo(Challenge, { foreignKey: 'challengeId' });
// ChallengeQuestion.belongsTo(Question, { foreignKey: 'questionId' });

export default ChallengeQuestion;