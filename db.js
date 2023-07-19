const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: isProduction // 如果在生产环境中，你可能希望验证SSL证书的有效性
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


