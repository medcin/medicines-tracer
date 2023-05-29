require("dotenv").config();
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB;
const host = process.env.DB_HOST;

const Pool = require("pg").Pool
const pool = new Pool({
    user: username,
    password: password,
    database: database,
    host: host,
    port: 5432
});

module.exports = pool;