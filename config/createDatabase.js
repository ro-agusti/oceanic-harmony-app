import { db } from './database.js';
import dotenv from 'dotenv';

dotenv.config();

const createDatabase = async () => {
    const dbName = process.env.DB_NAME;

    try {
        // Ejecuta la consulta para crear la base de datos
        await db.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`Base de datos "${dbName}" creada (si no existía).`);
    } catch (error) {
        console.error('Error al crear la base de datos:', error);
    } finally {
        // Cierra la conexión
        await db.close();
    }
};

createDatabase();
