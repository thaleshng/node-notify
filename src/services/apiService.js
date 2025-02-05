const axios = require("axios")

const API_URL = "http://localhost:8000/notificacoes"

const registrarNotificacao = async (data) => {
    try {
        const response = await axios.post(API_URL, data)
        return response.data
    } catch (error) {
        console.error("Erro ao registrar notificação", error);
        throw error
    }
}

module.exports = { registrarNotificacao };
