// goal-api/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Suas rotas
const playersRoutes = require("./routes/players.js");
const teamsRoutes = require("./routes/teams.js");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const ligasRoutes = require("./routes/ligas.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api/players", playersRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/ligas", ligasRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de back-end Goal-Wise está funcionando!");
});

app.listen(PORT, () => {
  console.log(`API de back-end rodando em http://localhost:${PORT}`);
});
