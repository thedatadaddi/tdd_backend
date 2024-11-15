//backend/index.js
require('dotenv').config();

const express = require('express');
const gpuRoutes = require('./routes/gpuRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Use the GPU routes
app.use('/api', gpuRoutes);

const PORT =  process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});