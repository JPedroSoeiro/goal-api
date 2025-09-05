// routes/index.js (Exemplo de como deve ficar)
const express = require("express");
const router = express.Router();

const playersRoutes = require("./players");
const teamsRoutes = require("./teams");
const authRoutes = require("./auth");
const usersRoutes = require("./users");
const ligasRoutes = require("./ligas"); // Importe a nova rota
const dashboardRoutes = require("./dashboard"); // Importe a nova rota

router.use("/players", playersRoutes);
router.use("/teams", teamsRoutes);
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/ligas", ligasRoutes); // Adicione a nova rota aqui
router.use("/dashboard", dashboardRoutes); // Adicione a nova rota aqui

module.exports = router;
