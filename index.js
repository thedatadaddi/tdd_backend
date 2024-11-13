require('dotenv').config();

const express = require('express');
const gpuInfoRoute = require('./routes/gpuInfoRoute');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Use the GPU routes
app.use('/api', gpuInfoRoute);

const PORT =  process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});