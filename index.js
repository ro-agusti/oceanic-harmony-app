import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'; // Rutas de usuarios
import { db } from './config/database.js'; // Conexión a la base de datos
import challengeRoutes from './routes/challengeRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import challengeQuestionRoutes from './routes/challengeQuestionRoutes.js'; // Importa las rutas de challengeQuestions
import userChallengesRoutes from './routes/userChallengeRoutes.js'
import initRelations from './models/initRelations.js';
import userResponsesRoutes from './routes/userResponsesRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Middlewares
app.use(cors());
app.use(express.json()); // To handle JSON in requests

// Routes
app.use('/api', userRoutes); 
app.use('/api', challengeRoutes); 
app.use('/api', questionRoutes); 
app.use('/api', challengeQuestionRoutes); 
app.use('/api', userChallengesRoutes);
app.use('/api', userResponsesRoutes);

// Synchronisation and start-up
const startApp = async () => {
    try {
      // Initialises relations between models
      initRelations();
  
      // Verify database connection
      await db.authenticate();
      console.log('Connection to the database successfully established.');
  
      // Synchronising the models with the database
      await db.sync({ alter: true }); // ({ force: true })
      console.log('Models synchronised with the database.');
  
      // Start server
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    } catch (error) {
      console.error('Error starting the application:', error);
    }
  };
  
 startApp();
