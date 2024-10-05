// server.js
const express = require('express');
const connectWithDb = require('./config/db');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const cors = require('cors');

require('dotenv').config();

// Initialize Express app
const app = express();

// Connect Database
connectWithDb();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);



// Set up the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
