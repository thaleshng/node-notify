const nodemailer = require("nodemailer");
const fs = require("fs");

const emailConfig = JSON.parse(fs.readFileSync(__dirname + "/../config/email_config.json", "utf-8"));

const transporter = nodemailer.createTransport({
    service: emailConfig.smtp.service,
    auth: {
        user: process.env.SMTP_USER || emailConfig.smtp.user,
        pass: process.env.SMTP_PASS || emailConfig.smtp.pass,
    },
});

const renderTemplate = (template, data) => {
    return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || "");
};

const sendEmail = async (action, data) => {
    const templateConfig = emailConfig.templates[action];

    if (!templateConfig) {
    throw new Error(`Template não encontrado para ação: ${action}`);
    }

    const htmlContent = renderTemplate(templateConfig.template, data);
    const mailOptions = {
    from: `"Node Notify" <${emailConfig.smtp.user}>`,
    to: emailConfig.recipients,
    subject: templateConfig.subject,
    html: htmlContent,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
