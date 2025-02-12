import { db } from "../../config/database.js";
import { DataTypes } from "sequelize";
import Question from "./Question.js";

const MultipleChoiceOption = db.define(
    "MultipleChoiceOption",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
    questionId: {
        type: DataTypes.UUID,
        references: {
          model: Question,
          key: "id",
        },
        allowNull: false,
      },
      optionText: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      tableName: "multiple_choice_options",
      timestamps: false,
    }
  );
  
  export default MultipleChoiceOption;