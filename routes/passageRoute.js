const express = require("express");
const { getAllPassages } = require("../controllers/passage");
const router = express.Router();

router.get("/", getAllPassages);

module.exports = router;