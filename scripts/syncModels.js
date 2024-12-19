import { db } from '../config/database.js';
import { User } from '../models/User.js';

const syncModels = async () => {
    try {
        // Sincronizar el modelo User con la base de datos
        await User.sync({ alter: true });
        console.log('User table has been updated successfully.');

        // Cerrar conexión
        await db.close();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error updating the database:', error.message);
    }
};

syncModels();
