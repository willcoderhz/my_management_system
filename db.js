const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = { pool };

async function testConnection() {
  try {
      const res = await pool.query('SELECT 1');
      console.log('Database connection successful!');
  } catch (err) {
      console.error('Database connection error', err);
      process.exit(1);
  }
}

testConnection();


