const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const http = require("http");
const { WebSocketServer } = require("ws");

// Suas rotas
const playersRoutes = require("./routes/players.js");
const teamsRoutes = require("./routes/teams.js");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const ligasRoutes = require("./routes/ligas.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware do Express
app.use(cors());
app.use(bodyParser.json());

// Rotas da API
app.use("/api/players", playersRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/ligas", ligasRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de back-end Goal-Wise está funcionando!");
});

// Cria um servidor HTTP a partir da sua aplicação Express.
// Isso é o que permite que o Express e o WebSocket funcionem na mesma porta.
const server = http.createServer(app);

// Cria o servidor WebSocket e o anexa ao servidor HTTP existente.
const wss = new WebSocketServer({ server });

// Lógica do WebSocket
wss.on("connection", function connection(ws) {
  console.log("Novo cliente WebSocket conectado!");

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    // Converte os dados do buffer para string para facilitar o manuseio.
    const message = data.toString();
    console.log("Recebido do cliente: %s", message);

    // Envia a mensagem de volta para TODOS os clientes conectados.
    // Isso é a essência da funcionalidade de chat.
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Mensagem de boas-vindas ao novo cliente
  ws.send("Bem-vindo ao chat da API Goal-Wise!");
});

// Faz o servidor HTTP (que inclui o Express e o WebSocket) escutar na porta.
server.listen(PORT, () => {
  console.log(`API de back-end rodando em http://localhost:${PORT}`);
});
