const { Pool } = require('pg');

// PostgreSQL connection setup
const pool = new Pool({
  user: 'postgres',
  host: 'postgres_tdd',
  database: 'tdd',
  password: 'Spencer.2328_tdd',
  port: 5432,
});

// Function to get GPU data
const getGpus = async () => {
  const result = await pool.query('SELECT * FROM test1');
  return result.rows;
};

module.exports = { getGpus };
