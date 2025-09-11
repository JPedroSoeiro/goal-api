// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const http = require("http");
const { WebSocketServer, WebSocket } = require("ws");

// Importe o novo middleware
const authMiddleware = require("./middleware/authMiddleware");

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

// --- Rotas Públicas ---
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// --- Rotas Protegidas ---
app.use("/api/players", authMiddleware, playersRoutes);
app.use("/api/teams", authMiddleware, teamsRoutes);
app.use("/api/ligas", authMiddleware, ligasRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de back-end Goal-Wise está funcionando!");
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  console.log("Novo cliente WebSocket conectado!");
  ws.on("error", console.error);
  ws.on("message", function message(data) {
    const message = data.toString();
    console.log("Recebido do cliente: %s", message);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.send("Bem-vindo ao chat da API Goal-Wise!");
});

server.listen(PORT, () => {
  console.log(`API de back-end rodando em http://localhost:${PORT}`);
});
