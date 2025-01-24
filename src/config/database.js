const { Sequelize } = require("sequelize");

require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
    await sequelize.sync({alter:true})
  } catch (err) {
    console.log(err);
  }
};

module.exports = {sequelize,connectDB}



// const { Sequelize } = require("sequelize");
// require("dotenv").config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     logging: process.env.NODE_ENV === "development" ? console.log : false,
//     dialectOptions: {
//       charset: "utf8mb4",
//     },
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   }
// );

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Database connected successfully!");
//     await sequelize.sync({ alter: true });
//   } catch (err) {
//     console.error("Unable to connect to the database:", err.message);
//     console.error("Stack trace:", err.stack);
//     process.exit(1); // Exit the process with failure
//   }
// };

// process.on("SIGINT", async () => {
//   console.log("Closing database connection...");
//   await sequelize.close();
//   console.log("Database connection closed.");
//   process.exit(0);
// });

// module.exports = { sequelize, connectDB };

