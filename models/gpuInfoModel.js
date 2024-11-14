const { Pool } = require('pg');

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Helper function to get the current date in Eastern Time
const getEasternDate = () => {
  const estDate = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York'
  });

  // Create a new Date object from the EST date string
  const date = new Date(estDate);

  // Format the date as YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// Function to get GPU data with JOIN on today's date in EST
const getGpuInfo = async () => {
  const estDate = getEasternDate();

  const query = `
    SELECT g.*, p.price_id, p.source_name, p.date_checked, 
           p.price_avg, p.price_med, p.price_best, p.link_best
    FROM gpu_info AS g
    INNER JOIN price_info AS p USING (gpu_id)
    WHERE p.date_checked = $1;
  `;
  
  try {
    const result = await pool.query(query, [estDate]);
    return result.rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
};

module.exports = { getGpuInfo };
