const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: true } : { rejectUnauthorized: false } // 在生产环境中验证SSL证书，而在开发环境中忽略SSL证书验证
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


