require("dotenv").config();
const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  email: {
    username: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
  },
};
module.exports = config;
