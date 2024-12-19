import { DataTypes } from 'sequelize';
import { db } from '../../config/database.js';

const MultipleTextOption = db.define('MultipleTextOption', {
    responseId: {
        type: DataTypes.UUID,
        references: { 
            //model: Response, 
            model: 'responses',
            key: 'id' },
        allowNull: false,
    },
    optionIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,  // Para identificar el orden de los fragmentos de texto si es necesario
    },
    textValue: {
        type: DataTypes.TEXT,
        allowNull: false,  // Aquí se almacena cada fragmento de texto
    },
}, {
    tableName: 'multiple_text_options',
    timestamps: true,
});

// Relaciones
// MultipleTextOption.belongsTo(Response, { foreignKey: 'responseId' });

export default MultipleTextOption;
