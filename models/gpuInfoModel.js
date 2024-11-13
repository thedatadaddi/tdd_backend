const { Pool } = require('pg');

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to get GPU data with JOIN on today's date
const getGpuInfo = async () => {
  const query = `
    SELECT g.*, p.price_id, p.source_name, p.date_checked, 
           p.price_avg, p.price_med, p.price_best, p.link_best
    FROM gpu_info AS g
    INNER JOIN price_info AS p USING (gpu_id)
    WHERE p.date_checked = CURRENT_DATE;
  `;
  
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
};

module.exports = { getGpuInfo };
