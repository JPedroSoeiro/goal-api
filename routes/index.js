const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const playersRoutes = require("./players");
const teamsRoutes = require("./teams");
const usersRoutes = require("./users");


// Agrupa todas as rotas
router.use('/auth', authRoutes);
router.use('/players', playersRoutes);
router.use('/teams', teamsRoutes);
router.use('/users', usersRoutes);

module.exports = router;