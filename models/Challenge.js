import { DataTypes } from 'sequelize';
import { db } from '../config/database.js'; // Asegúrate de que la conexión con la DB esté bien configurada

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
        type: DataTypes.DECIMAL(10, 2), // Puedes usar DECIMAL para manejar precios
        allowNull: false,
    },
    days: {  // Nueva columna
        type: DataTypes.INTEGER,
        allowNull: false, // Esto asegura que siempre se indique un número de días
        validate: {
            min: 1, // Validación opcional: al menos un día
        },
    }
}, {
    tableName: 'challenges',
    timestamps: true,
});

export default Challenge;
