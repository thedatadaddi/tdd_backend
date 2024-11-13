const express = require('express');
const router = express.Router();
const gpuInfoCont = require('../controllers/gpuInfoCont');

// Define the route to get GPU data
router.get('/gpuInfo', gpuInfoCont.getGpuInfo);

module.exports = router;
