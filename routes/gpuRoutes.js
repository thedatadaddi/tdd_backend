//backend/routes/gpuRoutes.js
const express = require('express');
const router = express.Router();
const gpuCompCont = require('../controllers/gpuCompCont');

// // Define the routes to get GPU data
// router.get('/gpuInfo', gpuInfoCont.getGpuInfo);
// router.post('/gpuPriceTs', gpuPriceTsCont.getPriceTsData);

// Define the routes to get GPU data
router.get('/gpuInfo', gpuCompCont.getGpuInfo);
router.post('/gpuPriceTs', gpuCompCont.getPriceTsData);
router.post('/gpuPriceMinMax', gpuCompCont.getGpuPriceMinMax)

module.exports = router;
