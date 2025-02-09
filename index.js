//backend/index.js
require('dotenv').config();

const express = require('express');
const gpuRoutes = require('./routes/gpuRoutes');
const genRoutes = require('./routes/genRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', gpuRoutes);
app.use('/api', genRoutes);

const PORT =  process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});