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
      unique: true,  // Agregar restricción de unicidad
    },
    // questionCategory: {
    //   type: DataTypes.ENUM(
    //     "daily",
    //     "daily-reflection",
    //     "weekly-reflection",
    //     "challenge-reflection"
    //   ),
    //   allowNull: false,
    // },
  },
  {
    tableName: "questions",
    timestamps: true,
  }
);

export default Question;
