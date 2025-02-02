// import { db } from "../../config/database.js";
// import { DataTypes } from "sequelize";
// import Question from "./Question.js";
// //import Challenge from "./Challenge.js";

// const Response = db.define(
//   "Response",
//   {
//     id: {
//       type: DataTypes.UUID,
//       defaultValue: DataTypes.UUIDV4,
//       primaryKey: true,
//     },
//     // userId: {
//     //   type: DataTypes.UUID,
//     //   allowNull: false,
//     // },
//     questionId: {
//       type: DataTypes.UUID,
//       references: {
//        // model: () => import("./Question.js").then((mod) => mod.default), // Función para evitar el acceso anticipado
//         model: Question,
//         key: "id",
//       },
//       allowNull: false,
//     },
//     // challengeId: {
//     //   type: DataTypes.UUID,
//     //   references: {
//     //     //model: () => import("./Challenge.js").then((mod) => mod.default), // Función para evitar el acceso anticipado
//     //     model: Challenge,
//     //     key: "id",
//     //   },
//     //   allowNull: false,
//     // },
//     responseType: {
//       type: DataTypes.ENUM("multiple-choice", "text", "multiple-text"),
//       allowNull: false,
//     },
//     allowCustomText: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false, // Solo aplicable para multiple-choice
//     },
//   },
//   {
//     tableName: "responses",
//     timestamps: true,
//   }
// );

// export default Response;
