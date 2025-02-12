import { db } from "../../config/database.js";
import { DataTypes } from "sequelize";
import Question from "./Question.js";
import  UserChallenges  from "./UserChallenges.js"
import  MultipleChoiceOption  from "./MultipleChoiceOption.js"
//import ChallengeQuestion from "./ChallengeQuestion.js";

const UserResponse = db.define(
  "UserResponse",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userChallengeId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserChallenges,
        key: "id",
      },
    },
    questionId: {
      type: DataTypes.UUID,
      references: {
        model: Question,
        key: "id",
      },
      allowNull: false,
    },
    selectedOptionId: {
      type: DataTypes.UUID, // Only applicable for multiple-choice
      allowNull: true,
      references: {
        model: MultipleChoiceOption,
        key: "id",
      },
    },
    // customText: {
    //   type: DataTypes.STRING, 
    //   allowNull: true,
    // },
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