import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { VERIFICATION_EMAIL_TEMPLATE, WELCOME_TEMPLATE } from "./emailTemplates.js";
dotenv.config();

// Create a transporter object using Gmail's SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS, // Your Gmail app password
    }
});

// Sender info
const sender = {
    address: 'testforpython74@gmail.com', // Replace with your email
    name: 'Auth'
};

// Function to send the verification email
export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [email]; // Directly use the email string

    try {
        // Send the email using the transporter object
        const response = await transporter.sendMail({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });

        console.log('Email sent successfully', response);
    } catch (error) {
        console.error('Error sending verification email', error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

// Function to send the welcome email
export const sendWelcomeEmail = async (email, name) => {
    const recipient = [email]; // Directly use the email string

    try {
        const response = await transporter.sendMail({
            from: sender,
            to: recipient,
            subject: "Welcome to Auth!",
            html: WELCOME_TEMPLATE.replace("{name}",name),
        });

        console.log('Welcome email sent successfully', response);
    } catch (error) {
        console.error('Error sending welcome email', error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
};
