import Challenge from '../models/challenges/Challenge.js';
import { db } from '../config/database.js';

(async () => {
    try {
        // Conectar con la base de datos
        await db.authenticate();
        console.log('Conexión con la base de datos establecida.');

        // Sincronizar modelos si es necesario
        await db.sync({ alter: true });

        // Crear el desafío
        await Challenge.create({
            title: 'Reto de 21 días de Gratitud',
            description: 'Un desafío para cultivar la gratitud durante 21 días consecutivos.',
            price: 15.99,
            days: 21, // Número de días que dura el desafío
        });

        console.log('Desafío creado con éxito.');
        process.exit(); // Termina el proceso
    } catch (error) {
        console.error('Error al crear el desafío:', error);
        process.exit(1); // Finaliza con error
    }
})();
