// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
    },
    rollNo: {
        type: String,
    },
    department: {
        type: String,
    },
    semester: {

        type: Number,
    },

    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
    },
});

module.exports = mongoose.model('User', UserSchema);