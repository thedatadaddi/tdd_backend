//backend/controllers/gpuPriceTsCont.js
const gpuPriceTsModel = require('../models/gpuPriceTsModel');

// Controller function to handle the POST request
const getPriceTsData = async (req, res) => {
  try {
    const { gpu_id } = req.body; // Extract gpu_id from the request body
    if (!gpu_id) {
      return res.status(400).json({ error: 'Missing gpu_id in the request body' });
    }

    const data = await gpuPriceTsModel.getPriceTsData(gpu_id);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in getPriceTsData:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
};

module.exports = { getPriceTsData };
