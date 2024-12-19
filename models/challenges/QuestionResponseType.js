import { db } from "../../config/database.js";
import { DataTypes } from "sequelize";
import Question from "./Question.js";

// Nuevo modelo para asociar preguntas con tipos de respuesta
const QuestionResponseType = db.define('QuestionResponseType', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    questionId: {
        type: DataTypes.UUID,
        references: { 
            //model: Question, 
            model: 'questions',
            key: 'id' },
        allowNull: false,
    },
    responseType: {
        type: DataTypes.ENUM('multiple-choice', 'text', 'multiple-text'),
        allowNull: false,
    },
}, {
    tableName: 'question_response_types',
    timestamps: false,
});

// Relaciones
// Question.hasMany(QuestionResponseType, { foreignKey: 'questionId' });
// QuestionResponseType.belongsTo(Question, { foreignKey: 'questionId' });

export {
    QuestionResponseType
};