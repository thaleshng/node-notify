const express = require("express");
const { sendEmail } = require("../services/emailService");

const router = express.Router();

router.post("/send-email", async (req, res) => {
    try {
        const { action, data } = req.body;
        await sendEmail(action, data);
        res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).json({ error: "Falha no envio do e-mail" });
    }
});

module.exports = router;
