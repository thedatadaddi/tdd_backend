//backend/controllers/genCont.js
const genModel = require("../models/genModel");

// Controller function to get unique values from a column
const getUniqueColValues = async (req, res) => {
  try {
    const { table, column } = req.body;

    if (!table || !column) {
      return res.status(400).json({ error: "Missing table or column in request body" });
    }

    const data = await genModel.queryUniqueColValues(table, column);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getUniqueColValues:", error);
    res.status(500).json({ error: "Database query failed" });
  }
};

// Controller function to get all columns for a table
const getAllColumns = async (req, res) => {
  try {
    const { table } = req.body;

    if (!table) {
      return res.status(400).json({ error: "Missing table name in request body" });
    }

    const data = await genModel.queryAllColumns(table);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getAllColumns:", error);
    res.status(500).json({ error: "Database query failed" });
  }
};

// Controller function to get min and max values from a column
const getMinMaxValues = async (req, res) => {
  try {
    const { table, column } = req.body;

    if (!table || !column) {
      return res.status(400).json({ error: "Missing table or column in request body" });
    }

    const data = await genModel.queryMinMaxValues(table, column);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getMinMaxValues:", error);
    res.status(500).json({ error: "Database query failed" });
  }
};

module.exports = { getUniqueColValues, getAllColumns, getMinMaxValues };

