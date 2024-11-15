//backend/models/gpuPriceTsModel.js
const { Pool } = require('pg');

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const getPriceTsData = async (gpu_id) => {

  const query = `select * from price_info where gpu_id = $1;`;
  
  try {
    const result = await pool.query(query, [gpu_id]);
    return result.rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
};

module.exports = { getPriceTsData };