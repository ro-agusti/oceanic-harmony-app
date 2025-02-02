import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import userRoutes from './routes/userRoutes.js'; // Rutas de usuarios
import { db } from './config/database.js'; // Conexión a la base de datos
import { verifyToken }  from './helpers/middleware/authMiddleware.js'; // Middleware de verificación de token
import challengeRoutes from './routes/challengeRoutes.js';
//import challengePurchaseRoutes from './routes/challengePurchaseRoutes.js'; // Importa las rutas de compras
//import questionRoutes from './routes/questionsRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
//import responseRoutes from './routes/responseRoutes.js';
import challengeQuestionRoutes from './routes/challengeQuestionRoutes.js'; // Importa las rutas de challengeQuestions
import userChallengesRoutes from './routes/userChallengeRoutes.js'
import initRelations from './models/initRelations.js';

dotenv.config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Para manejar JSON en las solicitudes

// Rutas
app.use('/api', userRoutes); 
app.use('/api', challengeRoutes); 
//app.use('/api', challengePurchaseRoutes); 
app.use('/api', questionRoutes); 
//app.use('/api', responseRoutes); 
app.use('/api', challengeQuestionRoutes); // Ruta para challenge-questions
app.use('/api', userChallengesRoutes);

// Sincronización y arranque
const startApp = async () => {
    try {
      // Inicializa relaciones entre modelos
      initRelations();
  
      // Verificar conexión a la base de datos
      await db.authenticate();
      console.log('Conexión con la base de datos establecida con éxito.');
  
      // Sincronizar los modelos con la base de datos
      await db.sync({ alter: true }); // ({ force: true })
      console.log('Modelos sincronizados con la base de datos.');
  
      // Iniciar servidor
      app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
      });
    } catch (error) {
      console.error('Error al iniciar la aplicación:', error);
    }
  };
  
  // Ejecutar la función para iniciar la aplicación
  startApp();
