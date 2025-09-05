const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController.js");

router.get("/totals", dashboardController.getTotals);

module.exports = router;
