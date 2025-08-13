// routes/players.js
const express = require("express");
const router = express.Router();
const playersController = require("../controllers/playersController.js");

router.get("/", playersController.getAllPlayers);
router.post("/", playersController.createPlayer);
router.put("/:id", playersController.updatePlayer);
router.delete("/:id", playersController.deletePlayer);

module.exports = router;
