// routes/teams.js
const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teamsController.js"); // Ajuste o caminho

router.get("/", teamsController.getAllTeams);
router.post("/", teamsController.createTeam);
router.delete("/:id", teamsController.deleteTeam); // Rota dinâmica para DELETE

module.exports = router;
