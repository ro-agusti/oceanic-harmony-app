import bcrypt from 'bcryptjs';
import { User } from '../models/User.js'; // Asegúrate de importar el modelo User
import jwt from 'jsonwebtoken';

const getUserProfile = async (req, res) => {
    try {
        // Get the user ID from the token
        const userId = req.user.userId;

         // Find the user by ID
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'role'], 
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Returns user information
        res.status(200).json(user);
    } catch (error) {
        console.error('Error obtaining user profile:', error);
        res.status(500).json({ message: 'Error obtaining user profile.' });
    }
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // create a new user
        const newUser = await User.create({
            name,
            email,
            password,  // The password will be automatically encrypted by the hook in the model
        });

        // generate a token
        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Registered user', token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Search for the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }

        // check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "incorrect password" });
        }

        // generate a token
        const token = jwt.sign(
            { 
                userId: user.id,
                role: user.role
             }, // payload del token
            process.env.JWT_SECRET, // Your secret to signing the token
            { expiresIn: '1h' } // Expires in 1 hour
        );

        return res.json({
            message: "User athenticate",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error authenticating user" });
    }
};
  
export { 
    getUserProfile, 
    registerUser,
    loginUser
};