import { User } from '../models/User.js'; // Importa el modelo de usuario
import { db } from '../config/database.js'; // Importa la conexión a la base de datos

// Function to create an administrator user
const createAdminUser = async () => {
    try {
        await db.authenticate();
        console.log('Database connection established.');

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
        await db.close();
        console.log('Database connection closed.');
    }
};

createAdminUser();
