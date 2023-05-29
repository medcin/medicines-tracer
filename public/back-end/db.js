require("dotenv").config();
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB;
const host = process.env.DB_HOST;

console.log(password);

const Pool = require("pg").Pool
const pool = new Pool({
    user: this.username,
    password: this.password,
    database: this.database,
    host: this.host,
    port: 5432
});

module.exports = pool;