//backend/routes/gpuRoutes.js
const express = require('express');
const router = express.Router();
const gpuInfoCont = require('../controllers/gpuInfoCont');
const gpuPriceTsCont = require('../controllers/gpuPriceTsCont');

// Define the routes to get GPU data
router.get('/gpuInfo', gpuInfoCont.getGpuInfo);
router.post('/gpuPriceTs', gpuPriceTsCont.getPriceTsData);

module.exports = router;
