// import express from 'express';
// import { generateToken, comparePassword } from '../helpers/auth.js';
// import { User } from '../models/User.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// const router = express.Router();

// // SIGN UP
// router.post('/signup', async (req, res) => {
//     const { username, email, password } = req.body;
  
//     // Verificar si el usuario ya existe
//     const userExists = await User.findOne({ where: { email } });
//     if (userExists) {
//       return res.status(400).json({ message: 'El usuario ya existe.' });
//     }
  
//     // Encriptar la contraseña
//     const hashedPassword = await bcrypt.hash(password, 10);
  
//     // Crear un nuevo usuario
//     try {
//       const user = await User.create({
//         username,
//         email,
//         password: hashedPassword,
//       });
  
//       // Crear un JWT
//       const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
//       // Responder con el token
//       res.status(201).json({ token });
//     } catch (error) {
//       res.status(500).json({ message: 'Error al crear el usuario.', error });
//     }
//   });


// //LOG IN
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     // Verificar si el usuario existe
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(400).json({ message: 'Usuario no encontrado.' });
//     }
  
//     // Comparar las contraseñas
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(400).json({ message: 'Contraseña incorrecta.' });
//     }
  
//     // Crear un JWT
//     const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
//     // Responder con el token
//     res.status(200).json({ token });
//   });

// export default router;
