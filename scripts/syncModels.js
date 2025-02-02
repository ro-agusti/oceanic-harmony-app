//import { response } from 'express';
import { db } from '../config/database.js';
// import { User } from '../models/User.js';
// import Response from '../models/challenges/Response.js';
// import Question from '../models/challenges/Question.js';
// import MultipleChoiceOption from '../models/challenges/MultipleChoiceOption.js';


const resetAndSyncDatabase = async () => {
    try {
      // Eliminar todas las tablas (resetear la base de datos)
      await db.drop(); 
      console.log('All tables have been dropped.');
  
      // Sincronizar los modelos (recrear tablas)
      await db.sync();
      console.log('All models have been recreated successfully.');
  
    } catch (error) {
      console.error('Error resetting the database:', error.message);
    }
  };
  
  // Ejecutar la función
  resetAndSyncDatabase();
  
// Función para sincronizar modelos con la base de datos
// const syncModels = async () => {
//     try {
//         // Sincronizar todos los modelos, eliminando y recreando las tablas
//         await db.sync({ force: true });  // Esto elimina y recrea todas las tablas

//         console.log('All models have been synchronized and tables have been recreated successfully.');

//         // Cerrar la conexión a la base de datos después de la sincronización
//         await db.close();
//         console.log('Database connection closed.');
//     } catch (error) {
//         console.error('Error synchronizing the database:', error.message);
//     }
// };

// // Resetear la base de datos (eliminar tablas)
// const resetDatabase = async () => {
//     try {
//         // Eliminar todas las tablas
//         await db.drop();

//         console.log('All tables have been dropped successfully.');

//         // Sincronizar los modelos (recrear tablas)
//         await Response.sync();
//         await Question.sync();
//         await MultipleChoiceOption.sync();

//         console.log('All models have been recreated successfully.');
//     } catch (error) {
//         console.error('Error resetting the database:', error.message);
//     }
// };

// resetDatabase();
// // Ejecutar la sincronización
// //syncModels();
