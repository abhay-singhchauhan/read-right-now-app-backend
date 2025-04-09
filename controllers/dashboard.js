import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDashboardStats = async (req, res) => {
    try {
        const [classCount, studentCount, assessmentCount] = await Promise.all([
            prisma.class.count(),
            prisma.student.count(),
            prisma.assessment.count()
        ]);

        res.status(200).json({
            success: true,
            data: {
                classCount,
                studentCount,
                assessmentCount
            }
        });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics."
        });
    }
};