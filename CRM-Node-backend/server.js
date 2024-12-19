const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const customerRoutes = require('./routes/customer');

const app = express();
const PORT = 5000; // Server port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/customers', customerRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
