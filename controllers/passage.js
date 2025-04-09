// controllers/passageController.ts or wherever you're handling routes
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllPassages = async (req, res) => {
    try {
        const passages = await prisma.passage.findMany({
            orderBy: { difficulty: 'asc' },
        });
        res.status(200).json(passages);
    } catch (error) {
        console.error("Error fetching passages:", error);
        res.status(500).json({ success: false, message: "Failed to fetch passages." });
    }
};
