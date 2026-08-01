require("dotenv").config();

const nodemailer = require("nodemailer");
const { createLog } = require("../functions/log");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === "465",

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },

    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
            html
        });

        console.log("Correo enviado correctamente:");
        console.log(info.messageId);

        return info;

    } catch (error) {
        await createLog(error);
        throw error;
    }
};

module.exports = {
    sendEmail
};