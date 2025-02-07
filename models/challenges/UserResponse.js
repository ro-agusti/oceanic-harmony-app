import { db } from "../../config/database.js";
import { DataTypes } from "sequelize";
import Question from "./Question.js";
import Challenge from "./Challenge.js";

const UserResponse = db.define(
  "UserResponse",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
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
    challengeId: {
      type: DataTypes.UUID,
      references: {
        model: Challenge,
        key: "id",
      }, 
      allowNull: true,
    },
    selectedOptionId: {
      type: DataTypes.UUID, // Only applicable for multiple-choice
      allowNull: true,
      references: {
        model: "multiple_choice_options",
        key: "id",
      },
    },
    customText: {
      type: DataTypes.STRING, 
      allowNull: true,
    },
    responseText: {
      type: DataTypes.STRING, // User-written response (for text or multiple-text)
      allowNull: true,
    },
  },
  {
    tableName: "user_responses",
    timestamps: true,
  }
);

export default UserResponse;