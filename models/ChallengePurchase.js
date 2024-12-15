import { DataTypes } from 'sequelize';
import { db } from '../config/database.js';
import { User } from './User.js';
import  Challenge  from './Challenge.js';

const ChallengePurchase = db.define('ChallengePurchase', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,  // Esto asegura que sea único para cada compra
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    challengeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Challenge,
            key: 'id'
        }
    },
    purchaseDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'challenge_purchases',
    timestamps: true,
});

User.hasMany(ChallengePurchase, { foreignKey: 'userId' });
Challenge.hasMany(ChallengePurchase, { foreignKey: 'challengeId' });

export { ChallengePurchase };
