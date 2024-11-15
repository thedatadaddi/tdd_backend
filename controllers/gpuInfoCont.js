//backend/controllers/gpuInfoCont.js
const gpuInfoModel = require('../models/gpuInfoModel');

// Controller function to handle the GET request
const getGpuInfo = async (req, res) => {
  try {
    const data = await gpuInfoModel.getGpuInfo();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
};

module.exports = { getGpuInfo };
