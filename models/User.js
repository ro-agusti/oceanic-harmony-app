import { DataTypes } from 'sequelize';
import { db } from '../config/database.js';
import bcrypt from 'bcrypt';

const User = db.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            name: 'unique_email', 
            msg: 'The email address is already in use.',
          },
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: { 
        type: DataTypes.ENUM('admin', 'user'), 
        allowNull: false,
        defaultValue: 'user', 
    }
}, {
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password && user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    },
});

// Method for verifying passwords
User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export { User };
