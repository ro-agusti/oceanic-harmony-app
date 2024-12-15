import bcrypt from 'bcryptjs';
import { User } from '../models/User.js'; // Asegúrate de importar el modelo User
import jwt from 'jsonwebtoken';

const getUserProfile = async (req, res) => {
    try {
        // Obtén el ID del usuario desde el token
        const userId = req.userId;

        // Encuentra al usuario por su ID
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email'], // Asegúrate de no enviar la contraseña
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Retorna la información del usuario
        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
    }
};

// Controlador para registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        // Crear un nuevo usuario
        const newUser = await User.create({
            name,
            email,
            password,  // La contraseña se encriptará automáticamente por el hook en el modelo
        });

        // Generar un token
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Enviar respuesta
        res.status(201).json({ message: 'Usuario registrado', token });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
};

// Función para hacer login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Comparar las contraseñas
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Generar el token
        const token = jwt.sign(
            { userId: user.id }, // payload del token
            process.env.JWT_SECRET, // Tu secreto para firmar el token
            { expiresIn: '1h' } // Expira en 1 hora
        );

        return res.json({
            message: "Usuario autenticado",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al autenticar usuario" });
    }
};
  
export { 
    getUserProfile, 
    registerUser,
    loginUser
};