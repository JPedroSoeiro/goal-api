const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const http = require("http");
const { WebSocketServer, WebSocket } = require("ws");
const url = require("url");

const authMiddleware = require("./middleware/authMiddleware");

const playersRoutes = require("./routes/players.js");
const teamsRoutes = require("./routes/teams.js");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const ligasRoutes = require("./routes/ligas.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/players", authMiddleware, playersRoutes);
app.use("/api/ligas", authMiddleware, ligasRoutes);

app.get("/", (req, res) => {
  res.send("API de back-end Goal-Wise está funcionando!");
});

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

const rooms = new Map();

function broadcast(teamId, message) {
  const clients = rooms.get(teamId);
  if (clients) {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

function broadcastUserCount(teamId) {
  const clients = rooms.get(teamId);
  const count = clients ? clients.size : 0;
  const userCountMessage = JSON.stringify({
    type: "user_count",
    count: count,
  });
  broadcast(teamId, userCountMessage);
}

server.on("upgrade", (request, socket, head) => {
  const { query } = url.parse(request.url, true);
  const teamId = query.teamId;

  if (!teamId) {
    socket.destroy();
    return;
  }

  wss.handleUpgrade(request, socket, head, (ws) => {
    ws.teamId = teamId;
    wss.emit("connection", ws, request);
  });
});

wss.on("connection", function connection(ws) {
  console.log(`Novo cliente conectado à sala: ${ws.teamId}`);

  if (!rooms.has(ws.teamId)) {
    rooms.set(ws.teamId, new Set());
  }
  rooms.get(ws.teamId).add(ws);

  broadcastUserCount(ws.teamId);

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    const messageString = data.toString();
    const messageObject = JSON.parse(messageString);

    if (messageObject.type === "connection") {
      ws.userName = messageObject.userName;
      const systemMessage = JSON.stringify({
        type: "system",
        content: `${ws.userName} está online`,
      });
      broadcast(ws.teamId, systemMessage);
    } else {
      broadcast(ws.teamId, messageString);
    }
  });

  ws.on("close", () => {
    console.log(`Cliente desconectado da sala: ${ws.teamId}`);
    const clients = rooms.get(ws.teamId);
    if (clients) {
      clients.delete(ws);
      if (clients.size === 0) {
        rooms.delete(ws.teamId);
      }
    }
    broadcastUserCount(ws.teamId);
    if (ws.userName) {
      const systemMessage = JSON.stringify({
        type: "system",
        content: `${ws.userName} saiu do chat`,
      });
      broadcast(ws.teamId, systemMessage);
    }
  });
});

server.listen(PORT, () => {
  console.log(`API de back-end rodando em http://localhost:${PORT}`);
});
