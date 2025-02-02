// controllers/questionController.js
import { db } from "../config/database.js";
import Question from "../models/challenges/Question.js";
import MultipleChoiceOption from "../models/challenges/MultipleChoiceOption.js";

const createQuestion = async (req, res) => {
  const { text, description, responseType, options } = req.body;

  // Verificar que el campo 'text' no esté vacío
  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "The question text is required." });
  }

  // Validar que si es multiple-choice, se envíen opciones
  if (responseType === "multiple-choice" && (!Array.isArray(options) || options.length === 0)) {
    return res.status(400).json({ message: "Multiple-choice questions must have at least one option." });
  }

  try {
    // Verificar si ya existe una pregunta con el mismo texto
    const existingQuestion = await Question.findOne({ where: { text } });

    if (existingQuestion) {
      return res.status(400).json({ message: "This question already exists." });
    }

    // El allowCustomText es calculado dependiendo de responseType
    const allowCustomText = responseType === "multiple-choice";

    // Usamos transacción para asegurar que la pregunta y opciones se crean juntas
    const newQuestion = await db.transaction(async (t) => {
      // Crear la nueva pregunta
      const question = await Question.create(
        {
          text,
          description,
          responseType,
          allowCustomText,
        },
        { transaction: t }
      );

      let optionsData = [];

      // Si es de opción múltiple, creamos las opciones
      if (responseType === "multiple-choice") {
        optionsData = options.map((option) => ({
          optionText: option.text,
          questionId: question.id,
        }));

        await MultipleChoiceOption.bulkCreate(optionsData, { transaction: t });
      }

      return { question, options: optionsData };
    });

    res.status(201).json({
      message: "Pregunta creada exitosamente.",
      newQuestion: {
        ...newQuestion.question.toJSON(),
        options: newQuestion.options,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating question." });
  }
};


const getAllQuestions = async (req, res) => {
    try {
        // Consulta todas las preguntas desde la base de datos
        const questions = await Question.findAll({
          include: [
            {
              model: MultipleChoiceOption,
             attributes: ["id", "optionText"], // Solo traemos los campos necesarios
            },
          ],
        });
        
        // Devuelve las preguntas en la respuesta
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error al obtener las preguntas:', error);
        res.status(500).json({ message: 'Error al obtener las preguntas' });
    }
};

// Obtener una pregunta por ID
const getQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      const question = await Question.findByPk(id, {
        include: [
          {
            model: MultipleChoiceOption,
            attributes: ['id', 'optionText'], // Selecciona solo los campos necesarios
            required: false, // No es necesario que tenga opciones, ya que no todas las preguntas son de opción múltiple
          }
        ],
      });
  
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }
  
      res.json(question);
    } catch (error) {
      console.error("Error fetching question:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de la pregunta desde los parámetros de la ruta
        const { text, description, responseType } = req.body; // Obtener el nuevo texto desde el cuerpo de la solicitud

        // // Validar que se haya proporcionado el nuevo texto
        // if (!text) {
        //     return res.status(400).json({ message: "El campo 'text' es obligatorio." });
        // }

        // Buscar la pregunta por su ID
        const question = await Question.findByPk(id);

        if (!question) {
            return res.status(404).json({ message: "Pregunta no encontrada." });
        }

        // Calculamos allowCustomText dependiendo de responseType
    const allowCustomText = responseType === "multiple-choice";

    await question.update({
      text,
      description,
      responseType,
      allowCustomText,
    });

    res.json(question);

        res.status(200).json({ message: "Pregunta actualizada con éxito.", question });
    } catch (error) {
        console.error("Error al actualizar la pregunta:", error);

        // Manejo específico de errores de unicidad
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ message: "El texto de la pregunta debe ser único." });
        }

        res.status(500).json({ message: "Error al actualizar la pregunta." });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de la pregunta desde los parámetros de la ruta

        // Buscar la pregunta por su ID
        const question = await Question.findByPk(id);

        if (!question) {
            return res.status(404).json({ message: "Pregunta no encontrada." });
        }

        // Eliminar la pregunta
        await question.destroy();

        res.status(200).json({ message: "Pregunta eliminada con éxito." });
    } catch (error) {
        console.error("Error al eliminar la pregunta:", error);
        res.status(500).json({ message: "Error al eliminar la pregunta." });
    }
};

  export { 
    createQuestion,
    getAllQuestions, 
    getQuestion,
    updateQuestion, 
    deleteQuestion
   };