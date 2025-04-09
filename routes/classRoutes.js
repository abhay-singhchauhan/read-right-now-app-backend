const express = require("express");
const { index, create } = require("../controllers/class");
const router = express.Router();

router.get("/", index);
router.post("/", create);


module.exports = router;