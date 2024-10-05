const mongoose = require("mongoose");
require("dotenv").config();

const connectWithDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.log("DB facing connection issues");
        console.error(error);
        process.exit(1);  // Exits the process if the connection fails
    }
};

module.exports = connectWithDb;