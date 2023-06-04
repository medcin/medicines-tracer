require("dotenv").config();
const dbUsername = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB;
const dbHost = process.env.DB_HOST;

const Pool = require("pg").Pool;
const pool = new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
  user: dbUsername,
  password: dbPassword,
  database: dbDatabase,
  host: dbHost,
  port: 5432
});

module.exports = pool;