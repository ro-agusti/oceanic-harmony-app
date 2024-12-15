import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//import { Sequelize } from 'sequelize';
import userRoutes from './routes/userRoutes.js'; // Rutas de usuarios
import { db } from './config/database.js'; // Conexión a la base de datos
import verifyToken  from './helpers/middleware/authMiddleware.js'; // Middleware de verificación de token
import challengeRoutes from './routes/challengeRoutes.js';
import challengePurchaseRoutes from './routes/challengePurchaseRoutes.js'; // Importa las rutas de compras


dotenv.config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Para manejar JSON en las solicitudes

// Rutas
app.use('/api', userRoutes); // Ruta para usuarios
app.use('/api', challengeRoutes); // Ruta para challenges
app.use('/api', challengePurchaseRoutes); // Agrega las rutas de compras

// Sincronizar la base de datos
(async () => {
    try {
        await db.sync({ alter: true }); // Sincroniza la base de datos con los modelos
        console.log('Base de datos sincronizada con los cambios en los modelos.');
    } catch (error) {
        console.error('Error al sincronizar la base de datos:', error);
    }
})();

// Ruta protegida (requiere token)
// app.get('/profile', verifyToken, (req, res) => {
//   // Aquí puedes devolver la información del perfil del usuario
//   res.status(200).json({ message: 'Perfil de usuario', userId: req.userId });
// });

// Iniciar servidor y sincronizar la base de datos
const startApp = async () => {
  try {
    // Verificar conexión a la base de datos
    await db.authenticate();
    console.log('Conexión con la base de datos establecida con éxito.');

    // Sincronizar los modelos con la base de datos
    await db.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos.');

    // Iniciar servidor
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

// Ejecutar la función para iniciar la aplicación
startApp();
