//backend/models/genModel.js
const { Pool } = require('pg');

// PostgreSQL connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const NodeCache = require("node-cache");
const metadataCache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

const fetchTableMetadata = async () => {
    const query = `
      SELECT table_name, column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'; -- Adjust schema if needed
    `;
  
    try {
      const result = await pool.query(query);
      const tableMetadata = {};
  
      result.rows.forEach(({ table_name, column_name }) => {
        if (!tableMetadata[table_name]) {
          tableMetadata[table_name] = [];
        }
        tableMetadata[table_name].push(column_name);
      });
  
      return tableMetadata; // { price_info: ["price_avg", "price_med"], gpu_info: ["gpu_id", "model_name"] }
    } catch (error) {
      console.error("Error fetching table metadata:", error);
      throw error;
    }
  };
  
// Function to fetch table metadata with caching
const fetchCachedTableMetadata = async () => {
    let metadata = metadataCache.get("tableMetadata");
  
    if (!metadata) {
      metadata = await fetchTableMetadata(); // Fetch from DB
      metadataCache.set("tableMetadata", metadata); // Store in cache
    }
    return metadata;
  };

// Function to query unique values from a table column
const queryUniqueColValues = async (table, column) => {
    const tableMetadata = await fetchCachedTableMetadata(); // Fetch whitelist from cache
  
    // Validate table and column
    if (!tableMetadata[table] || !tableMetadata[table].includes(column)) {
      throw new Error("Invalid table or column name");
    }
  
    // Check cache before querying DB
    const cacheKey = `unique_${table}_${column}`;
    let cachedResult = metadataCache.get(cacheKey);
    if (cachedResult) {
      return cachedResult; // Return cached result if available
    }
  
    // Execute safe SQL query to fetch unique values
    const query = `SELECT DISTINCT ${column} FROM ${table};`;
    try {
      const result = await pool.query(query);
      const uniqueValues = result.rows.map((row) => row[column]);
  
      // Cache the result for future queries
      metadataCache.set(cacheKey, uniqueValues);
      return uniqueValues;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  };

// Function to fetch all columns for a given table
const queryAllColumns = async (table) => {
    const tableMetadata = await fetchCachedTableMetadata(); // Fetch whitelist from cache
  
    // Validate table name
    if (!tableMetadata[table]) {
      throw new Error("Invalid table name");
    }
  
    // Check if result exists in cache
    const cacheKey = `columns_${table}`;
    let cachedColumns = metadataCache.get(cacheKey);
    if (cachedColumns) {
      return cachedColumns; // Return cached result if available
    }
  
    // Construct a safe query to retrieve all columns
    const query = `SELECT * FROM ${table} LIMIT 1;`;
    try {
      const result = await pool.query(query);
      const allColumns = Object.keys(result.rows[0] || {}); // Get column names
  
      // Cache the result for future queries
      metadataCache.set(cacheKey, allColumns);
      return allColumns;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  };

module.exports = { queryUniqueColValues, queryAllColumns};