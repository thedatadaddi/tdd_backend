//backend/routes/gpuRoutes.js
const express = require('express');
const router = express.Router();
const gpuCompCont = require('../controllers/gpuCompCont');
const genCont = require('../controllers/genCont')

// // Define the routes to get GPU data
// router.get('/gpuInfo', gpuInfoCont.getGpuInfo);
// router.post('/gpuPriceTs', gpuPriceTsCont.getPriceTsData);

// Define the routes to get GPU data
router.post('/gpuInfo', gpuCompCont.getGpuInfo);
router.post('/gpuPriceTs', gpuCompCont.getPriceTsData);
router.post('/gpuPriceMinMax', gpuCompCont.getGpuPriceMinMax)
router.post('/getUniqueColVals', genCont.getUniqueColValues);
router.post('/getAllCols', genCont.getAllColumns);
router.post('/getMinMaxValues', genCont.getMinMaxValues);

module.exports = router;
