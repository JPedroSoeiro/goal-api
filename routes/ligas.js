// goal-api/routes/ligas.js
const express = require("express");
const router = express.Router();
const ligasController = require("../controllers/ligasController.js");

router.get("/", ligasController.getAllLigas);
router.post("/", ligasController.createLiga);
router.put("/:id", ligasController.updateLiga);
router.delete("/:id", ligasController.deleteLiga);

module.exports = router;
