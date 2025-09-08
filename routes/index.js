const express = require("express");
const router = express.Router();

const playersRoutes = require("./players");
const teamsRoutes = require("./teams");
const authRoutes = require("./auth");
const usersRoutes = require("./users");
const ligasRoutes = require("./ligas");

router.use("/players", playersRoutes);
router.use("/teams", teamsRoutes);
router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/ligas", ligasRoutes);

module.exports = router;
