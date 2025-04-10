const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Existing: createAssessment
exports.createAssessment = async (req, res) => {
    const {
        student_id,
        class_id,
        date,
        word_count,
        words_correct,
        words_wrong,
        words_skipped,
        words_reread,
        last_word_index,
        completed,
    } = req.body;

    try {
        const newAssessment = await prisma.assessment.create({
            data: {
                student_id,
                class_id,
                date: new Date(date),
                word_count,
                words_correct,
                words_wrong,
                words_skipped,
                words_reread,
                last_word_index,
                completed,
            },
            include: {
                student: true,
                class: true,
            }
        });

        res.status(201).json(newAssessment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save assessment" });
    }
};


// Existing: getLatestAssessments
exports.getLatestAssessments = async (req, res) => {
    try {
        const assessments = await prisma.assessment.findMany({
            orderBy: {
                date: 'desc',
            },
            include: {
                student: true,
                class: true,
            },
        });

        res.status(200).json(assessments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch latest assessments" });
    }
};

// ✅ New: get assessments by student_id
exports.getAssessmentsByStudentId = async (req, res) => {
    const { student_id } = req.params;

    try {
        const assessments = await prisma.assessment.findMany({
            where: {
                student_id: student_id,
            },
            orderBy: {
                date: 'desc',
            },
            include: {
                class: true, // Optional: include related class info
            },
        });

        res.status(200).json(assessments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch assessments for student" });
    }
};
