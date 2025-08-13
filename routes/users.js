// routes/users.js
const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController.js"); // Ajuste o caminho

router.get("/", usersController.getAllUsers);
router.post("/", usersController.createUser);
router.put("/:id", usersController.updateUser);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
