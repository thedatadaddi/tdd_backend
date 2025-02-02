//backend/models/gpuCompModel.js
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

const getGpuPriceMinMax = async (source_name, column_name, gpu_id ) => {

  // Define a whitelist of valid column names
  const validColumns = ['price_avg', 'price_med', 'price_best'];

  // Check if the provided column name is in the whitelist
  if (!validColumns.includes(column_name)) {
    throw new Error('Invalid column name');
  }

  // Ensure source_name is provided
  if (!source_name) {
    throw new Error('source_name must be specified');
  }

  // Dynamically construct the WHERE clause
  let whereClause = 'WHERE source_name = $1';
  let params = [source_name];

  if (gpu_id !== 'all') {
    whereClause += ' AND gpu_id = $2';
    params.push(gpu_id);
  }

  // Construct the query dynamically using the validated column name
  const query = `
    SELECT MIN(${column_name}) AS min_, MAX(${column_name}) AS max_
    FROM price_info
    ${whereClause};
  `;

  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error executing query', error);
    throw error;
  }
};

module.exports = { getGpuInfo, getPriceTsData, getGpuPriceMinMax };