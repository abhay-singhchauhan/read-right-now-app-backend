const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

dotenv.config();

async function index(req, res) {
    try {
        const classes = await prisma.class.findMany({
            select: {
                id: true,
                name: true,
                teacher_id: true,
                students: {
                    select: {
                        id: true,
                        name: true,
                        // add other fields as needed
                    }
                },
                _count: {
                    select: {
                        students: true
                    }
                }
            }
        });

        // Transform data to include student count as a separate field
        const formattedClasses = classes.map(cls => ({
            id: cls.id,
            name: cls.name,
            teacher_id: cls.teacher_id,
            student_count: cls._count.students,
            students: cls.students
        }));

        res.status(200).json(formattedClasses);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'Failed to fetch classes with student lists and counts'
        });
    }
}


async function create(req, res) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            status: false,
            message: 'Class name is required',
        });
    }

    try {
        const newClass = await prisma.class.create({
            data: {
                name,
            },
        });

        res.status(201).json({
            status: true,
            message: 'Class created successfully',
            data: newClass,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: false,
            message: 'Failed to create class',
        });
    }
}


module.exports = { index, create }
