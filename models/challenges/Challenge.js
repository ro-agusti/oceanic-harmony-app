import { DataTypes } from 'sequelize';
import { db } from '../../config/database.js'; // Asegúrate de que la conexión con la DB esté bien configurada

const Challenge = db.define('Challenge', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false,
    },
    days: {  
        type: DataTypes.INTEGER,
        allowNull: false, 
        validate: {
            min: 1, 
        },
    }
}, {
    tableName: 'challenges',
    timestamps: true,
});

export default Challenge;
