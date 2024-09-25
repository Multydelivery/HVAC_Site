const express = require('express');
const router = express.Router();
const Appointment = require('../model/appointmentModels'); // saving data to the database mongodb
const path = require('path');
require('dotenv').config(); // after installing npm i nodemailer and npm i mailtrap

const { MailtrapTransport } = require('mailtrap'); // after installing npm i nodemailer and mailtrap
const Nodemailer = require('nodemailer'); // after installing npm i nodemailer and mailtrap

const TOKEN = process.env.MAIL_TOKEN;  // after installing npm i nodemailer and mailtrap

const transport = Nodemailer.createTransport(
    MailtrapTransport({
        token: TOKEN,
    })
);
const sender = {
    address: "hello@demomailtrap.com",
    name: "HVAC Demo Site",
};

// Schedule Service Route
router.post('/schedule_service', async (req, res) => {
    const { name, email, phone, date } = req.body;

    // Email context to send to the user
    let scheduleEmailText = `We've received your appointment request to schedule an appointment on ${date}. We'll give you a call at ${phone} to find a time that works for you. Sincerely, Cooler Than You HVAC Team`;

    // Try-catch block to handle errors
    try {
        const newAppointment = new Appointment({ name, email, phone, date });
        await newAppointment.save();

        await transport.sendMail({
            from: sender,
            to: email,
            subject: "HVAC Appointment Confirmation",
            text: scheduleEmailText,
            category: "Integration Test",
        });

        res.sendFile(path.join(__dirname, '../views/bookResult.html'));
    } catch (err) {
        console.log(err);
        res.sendFile(path.join(__dirname, '../views/bookError.html'));
    }
});

// Request Quote Route
router.post('/request_quote', async (req, res) => {
    const { name, email, service, message } = req.body;

    // Email context to send to the user
    let quoteEmailText = `Dear ${name},
We're honored that you're considering us for your ${service} needs!
One of our knowledgeable reps will email you at this address within one business day to hear more about how we can assist you.
For your records, your message was:

${message}

Sincerely,
Cooler Than You HVAC Team`;

    // Try-catch block to handle errors
    try {
        await transport.sendMail({
            from: sender,
            to: email,
            subject: "HVAC Quote Request Confirmation",
            text: quoteEmailText,
            category: "Integration Test",
        });

        res.sendFile(path.join(__dirname, '../views/bookResult.html'));
    } catch (err) {
        console.log(err);
        res.sendFile(path.join(__dirname, '../views/bookError.html'));
    }
});

module.exports = router;
