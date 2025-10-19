import { DataTypes } from "sequelize";
import { db } from "../../config/database.js";

const Challenge = db.define("Challenge", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  days: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // por defecto inactivo
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Challenge;

// import { DataTypes } from 'sequelize';
// import { db } from '../../config/database.js'; // Asegúrate de que la conexión con la DB esté bien configurada

// const Challenge = db.define('Challenge', {
//     id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     description: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//     },
//     price: {
//         type: DataTypes.DECIMAL(10, 2), 
//         allowNull: false,
//     },
//     days: {  
//         type: DataTypes.INTEGER,
//         allowNull: false, 
//         validate: {
//             min: 1, 
//         },
//     }
// }, {
//     tableName: 'challenges',
//     timestamps: true,
// });

// export default Challenge;
