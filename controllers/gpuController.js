const gpuModel = require('../models/gpuModel');

// Controller function to handle the GET request
const getGpuData = async (req, res) => {
  try {
    const data = await gpuModel.getGpus();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

module.exports = { getGpuData };
