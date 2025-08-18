require('dotenv').config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Importe o Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Suas rotas
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rota para a documentação do Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", router);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API de back-end Goal-Wise está funcionando!");
});

app.listen(PORT, () => {
  console.log(`API de back-end rodando em http://localhost:${PORT}`);
  console.log(`Documentação do Swagger disponível em http://localhost:${PORT}/api/docs`);
});
