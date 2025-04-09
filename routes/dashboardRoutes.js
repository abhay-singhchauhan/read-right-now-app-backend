const express = require("express");
const { getDashboardStats } = require("../controllers/dashboard");
const router = express.Router();

router.get("/stats", getDashboardStats);

module.exports = router;