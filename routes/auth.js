// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.loginUser);
router.post("/validate-token", authController.validateToken); // Nova rota para validar o token

module.exports = router;
