// import Response from "../models/challenges/Response.js";
// import Question from "../models/challenges/Question.js";

// const createResponseType = async (req, res) => {
//   try {
//     const { questionId, responseType } = req.body;

//     // Validar campos requeridos
//     if (!questionId || !responseType) {
//         return res.status(400).json({ error: "Missing required fields" });
//       }

//     // Verificar que la pregunta existe
//     const question = await Question.findByPk(questionId);
//     if (!question) {
//       return res.status(404).json({ error: "Question not found" });
//     }
// // Establecer allowCustomText automáticamente
// const allowCustomText = responseType === "multiple-choice";

//     const response = await Response.create({
//       questionId,
//       responseType,
//       allowCustomText,
//     });

//     res.status(201).json(response);
//   } catch (error) {
//     console.error("Error creating response:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const updateResponseType = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { responseType } = req.body;

//     const response = await Response.findByPk(id);
//     if (!response) {
//       return res.status(404).json({ error: "Response not found" });
//     }

//      // Determinar el nuevo valor de allowCustomText automáticamente
//      const newAllowCustomText = responseType === "multiple-choice";


//     // Solo actualizar si hay cambios
//     if (
//       (responseType !== undefined && responseType !== response.responseType) ||
//       newAllowCustomText !== response.allowCustomText
//     ) {
//       await response.update({
//         responseType: responseType ?? response.responseType,
//         allowCustomText: newAllowCustomText,
//       });
//     }

//     res.json(response);
//   } catch (error) {
//     console.error("Error updating response:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export {
//     createResponseType,
//     updateResponseType
// }
