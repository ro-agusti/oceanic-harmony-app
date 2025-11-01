import UserResponse from "../models/challenges/UserResponse.js";
import  UserChallenges  from "../models/challenges/UserChallenges.js";
import Question from "../models/challenges/Question.js";
import MultipleChoiceOption from "../models/challenges/MultipleChoiceOption.js"; 
import ChallengeQuestion from "../models/challenges/ChallengeQuestion.js";

// Create a new user response with validations
const createUserResponse = async (req, res) => {
    const { userId } = req.user; 
    const { questionId, userChallengeId, selectedOptionId, responseText } = req.body;

    //const { questionId, challengeId, selectedOptionId, responseText } = req.body;

    try {
        const userChallenge = await UserChallenges.findOne({
            where: { id: userChallengeId, userId }
            //where: { userId, challengeId }
        });

        if (!userChallenge) {
            return res.status(403).json({ message: "You do not have access to this challenge" });
        }

        const questionExists = await Question.findByPk(questionId);
        if (!questionExists) {
            return res.status(404).json({ message: "Question not found" });
        }

        if (selectedOptionId) {
            const optionExists = await MultipleChoiceOption.findByPk(selectedOptionId);
            if (!optionExists) {
                return res.status(400).json({ message: "Invalid selected option" });
            }
        }

        // Debugging: Check if userChallenge.id and questionId exist
        console.log("Checking existing response for userChallengeId:", userChallenge.id, "and questionId:", questionId);


        // Check if a response already exists for this userChallengeId and questionId
        const existingResponse = await UserResponse.findOne({
            where: {
                userChallengeId: userChallenge.id,
                questionId: questionId
            }
        });

        if (existingResponse) {
            // If a response already exists, update it
            existingResponse.selectedOptionId = selectedOptionId;
            existingResponse.responseText = responseText;

            await existingResponse.save();  

            console.log("🔄 Calling updateUserChallengeStatus with:", userId, userChallenge.id);

            // Update userChallenge status to ‘in-progress’.
             await updateUserChallengeStatus(userId, userChallenge.id);

            return res.status(200).json({
                message: "Response updated successfully",
                response: existingResponse
            });
        } else {
            // If no response exists, create a new one
            const newResponse = await UserResponse.create({
                userId,
                userChallengeId: userChallenge.id,
                questionId,
                selectedOptionId,
                responseText,
            });

            console.log("🔄 Calling updateUserChallengeStatus with:", userId, userChallenge.id);

        // Update userChallenge status to ‘in-progress’.
        await updateUserChallengeStatus(userId, userChallenge.id);

            return res.status(201).json({
                message: "Successfully created response",
                response: newResponse
            });
        }
    } catch (error) {
        console.error("Error creating or updating the response:", error);
        res.status(500).json({ message: "Internal error", error });
    }
};

// Get all user responses from a selected challenge
const getUserResponses = async (req, res) => {
  const { userId } = req.user; // autenticación previa
  const { userChallengeId } = req.params;

  try {
    // 1️⃣ Obtener UserChallenge
    const userChallenge = await UserChallenges.findOne({
      where: { id: userChallengeId, userId },
      attributes: ['id', 'challengeId']
    });

    if (!userChallenge) {
      return res.status(404).json({ message: "UserChallenge not found" });
    }

    // 2️⃣ Obtener todas las preguntas del challenge
    const challengeQuestions = await ChallengeQuestion.findAll({
      where: { challengeId: userChallenge.challengeId },
      include: [
        {
          model: Question,
          include: [
            { model: MultipleChoiceOption } // para multiple-choice
          ]
        }
      ]
    });

    // 3️⃣ Obtener todas las respuestas del usuario
    const userResponses = await UserResponse.findAll({
      where: { userChallengeId, userId },
    });

    // 4️⃣ Mapear preguntas con respuestas si existen
    const questionsWithResponses = challengeQuestions.map((cq) => {
      const q = cq.Question;
      const existingResponse = userResponses.find(r => r.questionId === q.id);

      return {
        questionId: q.id,
        question: q.text,
        questionType: q.responseType, // text, multiple-choice, multiple-text
        options: q.MultipleChoiceOptions || [],
        answer: existingResponse
          ? existingResponse.responseText || existingResponse.selectedOptionId
          : null,
        week: cq.week,
        day: cq.day,
        questionCategory: cq.questionCategory,
      };
    });

    res.status(200).json({ responses: questionsWithResponses });
  } catch (err) {
    console.error("Error fetching user responses:", err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
};
// const getUserResponses = async (req, res) => {
//   const { userId } = req.user;
//   const { userChallengeId } = req.params;

//   try {
//     // 1. Obtener el UserChallenge
//     const userChallenge = await UserChallenges.findOne({
//       where: { id: userChallengeId, userId },
//     });

//     if (!userChallenge) {
//       return res.status(404).json({ message: "UserChallenge not found" });
//     }

//     // 2. Obtener las preguntas del Challenge asociado
//     const questions = await Question.findAll({
//       where: { challengeId: userChallenge.challengeId },
//       include: [
//         {
//           model: MultipleChoiceOption,
//           attributes: ["id", "optionText"],
//         },
//       ],
//     });

//     // 3. Obtener las respuestas del usuario
//     const responses = await UserResponse.findAll({
//       where: { userChallengeId, userId },
//     });

//     // 4. Mapear preguntas con respuestas si existen
//     const questionsWithResponses = questions.map((q) => {
//       const existingResponse = responses.find((r) => r.questionId === q.id);

//       return {
//         questionId: q.id,
//         question: q.text,
//         questionType: q.type, // text o multiple-choice
//         options: q.MultipleChoiceOptions || [],
//         answer: existingResponse
//           ? existingResponse.responseText || existingResponse.selectedOptionId
//           : null,
//       };
//     });

//     res.status(200).json({ responses: questionsWithResponses });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error", error: err });
//   }
// };
// const getUserResponses = async (req, res) => {
//   const { userId } = req.user;
//   const { userChallengeId } = req.params;

//   try {
//     // 1. Obtener el userChallenge
//     const userChallenge = await UserChallenges.findOne({
//       where: { id: userChallengeId, userId },
//       include: [
//         {
//           model: Question,
//           attributes: ["id", "text", "type"], // type: text o multiple-choice
//           include: [
//             {
//               model: MultipleChoiceOption,
//               attributes: ["id", "optionText"],
//             },
//           ],
//         },
//       ],
//     });

//     if (!userChallenge) {
//       return res.status(404).json({ message: "UserChallenge not found" });
//     }

//     // 2. Obtener las respuestas del usuario
//     const responses = await UserResponse.findAll({
//       where: { userChallengeId, userId },
//     });

//     // 3. Mapear preguntas con respuestas si existen
//     const questionsWithResponses = userChallenge.Questions.map((q) => {
//       const existingResponse = responses.find((r) => r.questionId === q.id);

//       return {
//         questionId: q.id,
//         question: q.text,
//         questionType: q.type, // text o multiple-choice
//         options: q.MultipleChoiceOptions || [],
//         answer: existingResponse
//           ? existingResponse.responseText || existingResponse.selectedOptionId
//           : null,
//       };
//     });

//     res.status(200).json({ responses: questionsWithResponses });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error", error: err });
//   }
// };

// Delete userResponse
const deleteUserResponse = async (req, res) => {
    const { userId } = req.user; 
    const { userResponseId } = req.params; 

    try {
        //console.log("🔎 userId:", userId);
        //console.log("🔎 userResponseId:", userResponseId);

        
        const response = await UserResponse.findOne({
            where: { id: userResponseId, userId: userId },
            raw: true 
        });

        if (!response) {
            //console.log("❌ Response not found. It may have already been deleted.");
            return res.status(404).json({ message: "Response not found or access denied" });
        }

       // console.log("✅ Response found:", response);

        if (!response.userChallengeId) {
            //console.log("⚠️ Response does not have a userChallengeId, skipping status update.");
            return res.status(400).json({ message: "Response does not belong to a challenge" });
        }

        //console.log("🗑 Deleting response...");
        await UserResponse.destroy({ where: { id: userResponseId } });
        //console.log("✅ Response deleted.");

        //console.log("🔍 Searching UserChallenge:", response.userChallengeId);

        const userChallenge = await UserChallenges.findOne({
            where: { id: response.userChallengeId, userId: userId },
            raw: true 
        });

        if (!userChallenge) {
            //console.log("❌ UserChallenge not found for user:", userId, "challenge:", response.userChallengeId);
            return res.status(404).json({ message: "User challenge not found" });
        }

        //console.log("♻️ Updating user challenge status...");
        await updateUserChallengeStatus(userId, response.userChallengeId);
        console.log("✅ User challenge status updated.");

        res.status(200).json({ message: "Response deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting response:", error);
        res.status(500).json({ message: "Internal error", error });
    }
};

const updateUserChallengeStatus = async (userId, userChallengeId) => {
    try {
        console.log(`🔄 Updating challenge status for user: ${userId}, userChallengeId: ${userChallengeId}`);

        
        const userChallenge = await UserChallenges.findOne({
            where: { id: userChallengeId, userId: userId } // Asegurar que se usa el ID correcto
        });

        if (!userChallenge) {
            console.error(`❌ UserChallenge not found for user: ${userId}, userChallengeId: ${userChallengeId}`);
            return;
        }

        console.log("✅ UserChallenge found:", userChallenge);

        
        const totalQuestions = await ChallengeQuestion.count({
            where: { challengeId: userChallenge.challengeId } 
        });

        
        const answeredQuestions = await UserResponse.count({
            where: { userChallengeId: userChallenge.id, userId: userId }
        });

        console.log(`📊 Total questions: ${totalQuestions}, Answered: ${answeredQuestions}`);

        
        let newStatus = "in-progress";
        if (answeredQuestions >= totalQuestions) {
            newStatus = "completed";
        } else if (answeredQuestions === 0) {
            newStatus = "not-started";
        }

        
        const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

       
        await UserChallenges.update(
            { status: newStatus, progress: progress },
            { where: { id: userChallenge.id } }
        );

        console.log(`✅ Status updated: ${newStatus}, Progress: ${progress.toFixed(2)}%`);

    } catch (error) {
        console.error("❌ Error updating challenge status:", error);
    }
};

export {
    createUserResponse,
    getUserResponses,
    //updateUserResponse,
    deleteUserResponse
}