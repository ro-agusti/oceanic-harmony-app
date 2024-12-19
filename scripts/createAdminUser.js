import { User } from '../models/User.js'; // Importa el modelo de usuario
import { db } from '../config/database.js'; // Importa la conexión a la base de datos

// Función para crear un usuario administrador
const createAdminUser = async () => {
    try {
        // Asegurarse de que la base de datos esté conectada
        await db.authenticate();
        console.log('Database connection established.');

        // Crear el usuario administrador
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123', // La contraseña será hasheada automáticamente por el hook
            role: 'admin',
        });

        console.log('Admin user created successfully:', admin.toJSON());
    } catch (error) {
        console.error('Error creating admin user:', error.message);
    } finally {
        // Cerrar la conexión después de ejecutar el script
        await db.close();
        console.log('Database connection closed.');
    }
};

// Ejecutar el script
createAdminUser();
