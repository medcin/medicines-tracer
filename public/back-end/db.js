/*require("dotenv").config();
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

module.exports = pool;*/ // this will export the pool object which will be used to query the database (note: this is not a singlton class, so it will create a new pool object every time it is imported)
require("dotenv").config();

const dbUsername = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB;
const dbHost = process.env.DB_HOST;

const Pool = require("pg").Pool;

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.pool = new Pool({
      ssl: {
        rejectUnauthorized: false,
      },
      user: dbUsername,
      password: dbPassword,
      database: dbDatabase,
      host: dbHost,
      port: 5432,
    });

    Database.instance = this;
    return this;
  }

  query(sql, params) {
    return this.pool.query(sql, params);
  }
}

const instance = new Database();
Object.freeze(instance);

module.exports = instance; // here we exports an instance of the Database class, which will be used to query the database (note: this is a singlton class, so it will create a new pool object only once)
