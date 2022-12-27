const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  database: process.env.DB_NAME
});

module.exports = pool;