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

function broadcast(roomId, message, currentClient) {
  const clients = rooms.get(roomId);
  if (clients) {
    clients.forEach((client) => {
      // Modificado para não enviar de volta para quem mandou
      if (client !== currentClient && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

function broadcastUserCount(roomId) {
  const clients = rooms.get(roomId);
  const count = clients ? clients.size : 0;
  const userCountMessage = JSON.stringify({
    type: "user_count",
    count: count,
  });

  // Envia a contagem para TODOS na sala, incluindo quem acabou de entrar
  if (clients) {
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(userCountMessage);
      }
    });
  }
}

server.on("upgrade", (request, socket, head) => {
  const { query } = url.parse(request.url, true);
  // --- INÍCIO DA ALTERAÇÃO ---
  // Se teamId existir, a sala é `team-ID`, senão é a sala 'general'
  const roomId = query.teamId ? `team-${query.teamId}` : "general";
  // --- FIM DA ALTERAÇÃO ---

  wss.handleUpgrade(request, socket, head, (ws) => {
    ws.roomId = roomId; // Armazena o ID da sala no objeto do cliente
    wss.emit("connection", ws, request);
  });
});

wss.on("connection", function connection(ws) {
  console.log(`Novo cliente conectado à sala: ${ws.roomId}`);

  if (!rooms.has(ws.roomId)) {
    rooms.set(ws.roomId, new Set());
  }
  rooms.get(ws.roomId).add(ws);

  broadcastUserCount(ws.roomId);

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
      broadcast(ws.roomId, systemMessage, ws);
    } else {
      const fullMessage = JSON.stringify(messageObject);
      const clients = rooms.get(ws.roomId);
      if (clients) {
        clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(fullMessage);
          }
        });
      }
    }
  });

  ws.on("close", () => {
    console.log(`Cliente desconectado da sala: ${ws.roomId}`);
    const clients = rooms.get(ws.roomId);
    if (clients) {
      clients.delete(ws);
      if (clients.size === 0) {
        rooms.delete(ws.roomId);
      }
    }
    broadcastUserCount(ws.roomId);
    if (ws.userName) {
      const systemMessage = JSON.stringify({
        type: "system",
        content: `${ws.userName} saiu do chat`,
      });
      broadcast(ws.roomId, systemMessage, ws); // Não precisa notificar a si mesmo que saiu
    }
  });
});

server.listen(PORT, () => {
  console.log(
    `API de back-end e WebSocket rodando em http://localhost:${PORT}`
  );
});
