import { db } from "../../config/database.js";
import { DataTypes } from "sequelize";

const Question = db.define(
  "Question",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: false,
      //unique: true,  
    },
    description: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
    responseType: {
      type: DataTypes.ENUM("multiple-choice", "text", "multiple-text"),
      allowNull: false,
    },
    allowCustomText: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // Only applicable for multiple-choice
    },
  },
  {
    tableName: "questions",
    timestamps: true,
  }
);

export default Question;
