import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: "mysql",
  dialectOptions: {
    ssl: { require: true }
  }
});

sequelize.authenticate()
  .then(() => console.log("✅ Connected to MySQL via Railway"))
  .catch(err => console.error("❌ Connection error:", err));
// const db = new Sequelize(
//   process.env.MYSQLDATABASE,
//   process.env.MYSQLUSER,
//   process.env.MYSQLPASSWORD,
//   {
//     host: process.env.MYSQLHOST,
//     port: process.env.MYSQLPORT,
//     dialect: "mysql",
//   }
// );

// const db = new Sequelize(process.env.MYSQLURL, {
//   dialect: "mysql",
//   logging: false,
// });

// const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'mysql',
//     logging: false, // Optional
// });

export { db };