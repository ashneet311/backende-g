const mongoose = require('mongoose');
require('dotenv').config();

const connectWithDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // Removed deprecated options
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); // Exit if the database connection fails
    }
};

module.exports = connectWithDb;
