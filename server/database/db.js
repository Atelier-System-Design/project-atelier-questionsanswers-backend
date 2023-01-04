require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  port: process.env.PGPORT,
});

module.exports = pool;