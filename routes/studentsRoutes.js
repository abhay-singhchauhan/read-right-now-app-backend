const express = require("express");
const { index, getAllStudents, createStudent } = require("../controllers/student");
const router = express.Router();

// GET /api/student/:class_id
router.get("/:class_id", index);
router.get("/", getAllStudents);
router.post("/", createStudent);



module.exports = router;
