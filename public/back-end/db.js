const Pool = require("pg").Pool
const pool = new Pool({
    user: "",
    password: "",
    database: "",
    host: "localhost",
    port: 5432
});

module.exports = pool;