import { DataTypes } from 'sequelize';
import { db } from '../../config/database.js';
import { User } from '../User.js';
import Challenge from './Challenge.js';

const UserChallenges = db.define('UserChallenge', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  challengeId: {
    type: DataTypes.UUID,
    references: {
      model: Challenge,
      key: 'id',
    },
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('in-progress', 'completed', 'not-started'),
    defaultValue: 'not-started',
  },
}, {
  tableName: 'user_challenges',
  timestamps: true,
});

export default UserChallenges;
