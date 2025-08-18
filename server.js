// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Suas rotas
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de back-end Goal-Wise está funcionando!");
});

app.listen(PORT, () => {
  console.log(`API de back-end rodando em http://localhost:${PORT}`);
});
