import { db } from './database.js';
import dotenv from 'dotenv';

dotenv.config();

const createDatabase = async () => {
    const dbName = process.env.DB_NAME;

    try {
        // Executes the query to create the database        await db.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
        console.log(`Base de datos "${dbName}" creada (si no existía).`);
    } catch (error) {
        console.error('Error al crear la base de datos:', error);
    } finally {
// Close the connection
        await db.close();
    }
};

createDatabase();
