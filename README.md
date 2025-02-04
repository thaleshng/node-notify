# 📧 Microsserviço de Notificação por E-mail

Microsserviço desenvolvido em **Node.js** para envio de e-mails sempre que um registro for criado ou deletado no sistema principal (**FastAPI**). O serviço recebe requisições HTTP e utiliza **Nodemailer** para o envio de notificações.

---

## 📋 Pré-requisitos

- **Node.js** 16+ instalado ([Download Node.js](https://nodejs.org/))
- Conta em um **provedor SMTP** (Gmail, Outlook, Yahoo, Amazon SES, etc.)
- Permissão para envio de e-mails via SMTP

---

## 🛠 Configuração do Ambiente

1. **Clonar o repositório**
   ```bash
   git clone https://github.com/thaleshng/node-notify.git
   cd node-notify
   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```

3. **Criar e configurar o arquivo `.env`**
   Crie um arquivo `.env` na raiz do projeto com suas credenciais SMTP:

   ```ini
   PORT=3000
   SMTP_USER=seuemail@gmail.com
   SMTP_PASS=sua_senha_de_aplicativo
   ```

   **Se estiver usando Gmail**, gere uma **Senha de Aplicativo**:  
   👉 [Gerar senha de aplicativo no Google](https://myaccount.google.com/apppasswords)

---

## 🚀 Iniciar o Servidor

Para iniciar o microsserviço, rode:

```bash
node src/app.js
```

O serviço estará disponível em:  
📡 **http://localhost:3000/api/send-email**

---

## 🔍 Documentação da API

### **📤 Enviar E-mail de Notificação**
- **Endpoint:** `POST /api/send-email`
- **Descrição:** Envia um e-mail quando um registro é **criado ou deletado**.
- **Parâmetros (JSON):**
  ```json
  {
    "action": "create",
    "data": {
      "nome": "João",
      "cpf": "12345678900"
    }
  }
  ```
- **Ações Suportadas:**
  - `"create"` → Quando um novo registro é adicionado.
  - `"delete"` → Quando um registro é removido.

---

## 📡 Exemplo de Uso com `curl`

### **Criar um Registro (Dispara e-mail de criação)**
```bash
curl -X POST "http://localhost:3000/api/send-email" \
     -H "Content-Type: application/json" \
     -d '{ "action": "create", "data": { "nome": "João", "cpf": "12345678900" } }'
```

### **Deletar um Registro (Dispara e-mail de remoção)**
```bash
curl -X POST "http://localhost:3000/api/send-email" \
     -H "Content-Type: application/json" \
     -d '{ "action": "delete", "data": { "nome": "João", "cpf": "12345678900" } }'
```

---

## 🛠 Como Integrar com o Backend Python (FastAPI)

No **FastAPI**, adicione a função abaixo no arquivo **`utils.py`** para chamar o microsserviço:

```python
import httpx

EMAIL_SERVICE_URL = "http://localhost:3000/api/send-email"

async def notify_email(action: str, data: dict):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(EMAIL_SERVICE_URL, json={"action": action, "data": data})
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as error:
        print(f"Erro ao chamar serviço de e-mail: {error.response.status_code} - {error.response.text}")
    except Exception as error:
        print(f"Erro inesperado ao enviar e-mail: {str(error)}")
```

Agora, basta chamar essa função ao **criar ou deletar registros** no backend Python.

---

## 🧪 Ferramentas Recomendadas para Testes

- **Thunder Client (VS Code Extension)** → Extensão prática para testes via VS Code.
- **curl** → Para testes rápidos no terminal.

---

## 📡 Configuração dos Templates de E-mail

O microsserviço usa um arquivo JSON (`email_config.json`) para definir templates e destinatários.

### **📄 `email_config.json`**
```json
{
  "smtp": {
    "service": "gmail",
    "user": "seuemail@gmail.com", // remetente da notificação
    "pass": "sua-senha-de-aplicativo-google"
  },
  "recipients": ["admin@empresa.com", "admin@empresa.com"], // destinatários que receberão as notificações
  "templates": {
    "create": { // Action
      "subject": "Novo Registro Criado", // Assunto e-mail
      "template": "<p>Um novo registro foi criado: <strong>{{nome}}</strong> ({{cpf}})</p>" // corpo e-mail
    },
    "delete": { // Action
      "subject": "Registro Deletado", // Assunto e-mail
      "template": "<p>O registro <strong>{{nome}}</strong> ({{cpf}}) foi removido.</p>" // corpo e-mail
    }
  }
}
```
---

## 🎯 Conclusão

Agora, o microsserviço de e-mail está **pronto para ser usado e integrado ao backend Python**! 🚀  

Se precisar de ajustes ou melhorias, me avise! 😊
