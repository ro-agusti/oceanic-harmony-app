import { DataTypes } from 'sequelize';
import { db } from '../../config/database.js';

const ChallengeQuestion = db.define('ChallengeQuestion', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  challengeId: {
    type: DataTypes.UUID,
    references: { 
      model: 'challenges',
      key: 'id' 
    },
    allowNull: false,
  },
  questionId: {
    type: DataTypes.UUID,
    references: { 
      model: 'questions',
      key: 'id' 
    },
    allowNull: false,
  },
  week: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  day: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: { min: 1 },
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
  indexes: [
    {
      unique: true,
      fields: ['challengeId', 'questionId', 'day']
    }
  ]
});

export default ChallengeQuestion;
