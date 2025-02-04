require("./config/dotenv.config");

const express = require("express");
const emailRoutes = require("./routes/emailRoutes");

const app = express();
app.use(express.json());
app.use("/api", emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Microsserviço de e-mail rodando na porta ${PORT}`));
