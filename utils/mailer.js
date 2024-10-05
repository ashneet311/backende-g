const nodemailer = require('nodemailer');
require("dotenv").config();


// Function to send an email
const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // or use another email service like Outlook, or configure a custom SMTP
            auth: {
                user: process.env.EMAIL_USER, // Your email id
                pass: process.env.EMAIL_PASS, // Your email password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email sending failed');
    }
};

module.exports = sendEmail;