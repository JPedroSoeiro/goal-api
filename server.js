// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Suas rotas
const playersRoutes = require("./routes/players.js");
const teamsRoutes = require("./routes/teams.js");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api/players", playersRoutes); // Exemplo: /api/players
app.use("/api/teams", teamsRoutes); // Exemplo: /api/teams
app.use("/api/auth", authRoutes); // Exemplo: /api/auth

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de back-end Goal-Wise está funcionando!");
});

app.listen(PORT, () => {
  console.log(`API de back-end rodando em http://localhost:${PORT}`);
});
