const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendEmail = require('../utils/mailer');


exports.register = async (req, res) => {

    const { name, rollno, department, semester, phone, email, password } = req.body;
    console.log("Received registration request:", { name, rollno, department, semester, phone, email, password }); // Log the request

    try {

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists plss go to login" });
        }
        user = new User({

            name,
            rollno,
            department,
            semester,
            phone,
            email,
            password,
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ msg: 'user registered successfully' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        // Generate OTP and send to user's email
        const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
        user.otp = otp; // Save OTP to user document in DB
        await user.save();

        // Send OTP via email
        await sendEmail(
            email,
            'Welcome to grievieance portal ',
            `Your OTP code is: ${otp}`
        );

        res.status(200).json({ msg: 'OTP sent to email', userId: user._id }); // Send the userId to the frontend
    } catch (err) {
        console.error(err.message);
        res.status(404).send('Server error');
    }
}

exports.verify = async (req, res) => {
    const { userId, otp } = req.body;

    try {
        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User does not exist' });
        }

        // Check if OTP matches
        if (user.otp !== otp) {
            return res.status(400).json({ msg: 'Invalid OTP' });
        }

        // Clear OTP after verification
        user.otp = undefined;
        await user.save();

        res.status(200).json({ msg: 'OTP verified successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}