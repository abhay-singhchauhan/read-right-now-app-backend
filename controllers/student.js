const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fetch students by class_id
async function index(req, res) {
    const { class_id } = req.params;

    try {
        const students = await prisma.student.findMany({
            where: {
                class_id: class_id
            }
        });

        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'Failed to fetch students'
        });
    }
}

// ✅ Fetch all students (no filter)
async function getAllStudents(req, res) {
    try {
        const students = await prisma.student.findMany({
            include: {
                class: true,
                assessments: true,
            }
        });
        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'Failed to fetch all students'
        });
    }
}


// Create a new student
async function createStudent(req, res) {
    const { name, class_id } = req.body;

    try {
        const newStudent = await prisma.student.create({
            data: {
                name,
                class_id: class_id || null  // optional, only set if provided
            }
        });

        res.status(201).json(newStudent);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'Failed to create student',
            error: err.message
        });
    }
}


module.exports = { index, getAllStudents, createStudent };
