//backend/controllers/gpuCompCont.js
const gpuCompModel = require('../models/gpuCompModel');

// Controller function to handle the GET request
const getGpuInfo = async (req, res) => {
    try {
      const { source_name } = req.body;
      const data = await gpuCompModel.getGpuInfo(source_name);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Database query failed' });
    }
  };

// Controller function to handle the POST request
const getPriceTsData = async (req, res) => {
  try {
    const { source_name, gpu_id } = req.body; // Extract gpu_id from the request body

    if (!gpu_id) {
      return res.status(400).json({ error: 'Missing gpu_id in the request body' });
    }

    const data = await gpuCompModel.getPriceTsData(source_name, gpu_id);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in getPriceTsData:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
};

// Controller function to handle the POST request
const getGpuPriceMinMax = async (req, res) => {
  try {
    const { source_name, column_name, gpu_id } = req.body; // Extract gpu_id from the request body
    if (!gpu_id) {
      return res.status(400).json({ error: 'Missing column_name or gpu_id in the request body' });
    }

    const data = await gpuCompModel.getGpuPriceMinMax(source_name, column_name, gpu_id);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in getGpuPriceMinMax:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
};

module.exports = { getGpuInfo, getPriceTsData, getGpuPriceMinMax };