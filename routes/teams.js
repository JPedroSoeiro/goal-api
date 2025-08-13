// routes/teams.js
const express = require("express");
const router = express.Router();
const teamsController = require("../controllers/teamsController.js");

router.get("/", teamsController.getAllTeams);
router.post("/", teamsController.createTeam);
router.put("/:id", teamsController.updateTeam);
router.delete("/:id", teamsController.deleteTeam);

module.exports = router;
