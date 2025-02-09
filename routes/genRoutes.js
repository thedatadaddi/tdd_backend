//backend/routes/gpuRoutes.js
const express = require('express');
const router = express.Router();
const genCont = require('../controllers/genCont')

// Define the routes to get Gen data
router.post('/getUniqueColumnValues', genCont.getUniqueColumnValues);
router.post('/getAllColumns', genCont.getAllColumns);
router.post('/getMinMaxValues', genCont.getMinMaxValues);
router.post('/getColumnDataTypes', genCont.getColumnDataTypes)

module.exports = router;