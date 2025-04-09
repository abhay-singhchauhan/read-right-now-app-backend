// routes/assessments.js
const express = require('express');
const { createAssessment, getLatestAssessments, getAssessmentsByStudentId } = require('../controllers/assesments');
const router = express.Router();

router.get('/student/:student_id', getAssessmentsByStudentId);
router.post('/', createAssessment);
router.get('/', getLatestAssessments);

module.exports = router;
