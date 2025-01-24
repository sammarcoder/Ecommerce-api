require('dotenv').config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_prod`,
    host: DB_HOST,
    dialect: 'mysql',
  },
};
