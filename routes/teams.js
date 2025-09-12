const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teamsController.js");
const authMiddleware = require("../middleware/authMiddleware");

// ROTA PÚBLICA: Permite que qualquer um (incluindo o seu frontend no servidor) veja a lista de times.
router.get("/", teamsController.getAllTeams);

// ROTAS PROTEGIDAS: Apenas utilizadores autenticados podem aceder.
router.get("/:id", authMiddleware, teamsController.getTeamById); // Busca por ID deve ser protegida
router.post("/", authMiddleware, teamsController.createTeam);
router.put("/:id", authMiddleware, teamsController.updateTeam);
router.delete("/:id", authMiddleware, teamsController.deleteTeam);

module.exports = router;
