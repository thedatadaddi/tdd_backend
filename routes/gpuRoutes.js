const express = require('express');
const router = express.Router();
const gpuController = require('../controllers/gpuController');

// Define the route to get GPU data
router.get('/gpus', gpuController.getGpuData);

module.exports = router;
