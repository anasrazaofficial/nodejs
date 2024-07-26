const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

module.exports = emailHelper = async (options) => {
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        }
    });

    await transporter.sendMail({
        from: 'anasbukhari4114@gmail.com',
        to: options?.to,
        subject: options?.subject,
        text: options?.text
    });
}