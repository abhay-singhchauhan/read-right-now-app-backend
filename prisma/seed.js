const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Seed users
    const users = await prisma.user.createMany({
        data: [
            { name: "Alice Johnson", email: "alice@example.com" },
            { name: "Bob Smith", email: "bob@example.com" },
            { name: "Charlie Brown", email: "charlie@example.com" },
        ],
    });

    // Fetch user IDs to use as teacher IDs
    const teachers = await prisma.user.findMany();

    // Seed classes
    const classes = await prisma.class.createMany({
        data: [
            { name: "Math 101", teacher_id: teachers[0].id },
            { name: "Science 201", teacher_id: teachers[1].id },
            { name: "History 301", teacher_id: teachers[2].id },
        ],
    });

    // Fetch class IDs to assign to students
    const classList = await prisma.class.findMany();

    // Seed students
    await prisma.student.createMany({
        data: [
            { name: "Lily Evans", class_id: classList[0].id },
            { name: "Harry Potter", class_id: classList[0].id },
            { name: "Ron Weasley", class_id: classList[1].id },
            { name: "Hermione Granger", class_id: classList[1].id },
            { name: "Neville Longbottom", class_id: classList[2].id },
        ],
    });

    // 🌱 Seed passages
    await prisma.passage.createMany({
        data: [
            {
                title: "पर्यावरण संरक्षण",
                content: "पर्यावरण हमारे जीवन का महत्वपूर्ण हिस्सा है। हमें पेड़ लगाने चाहिए और जल प्रदूषण को रोकने के लिए प्रयास करना चाहिए। स्वच्छ वातावरण में ही स्वस्थ जीवन संभव है।",
                difficulty: "easy",
                language: "hindi",
            },
            {
                title: "स्वतंत्रता संग्राम",
                content: "भारत का स्वतंत्रता संग्राम अनेक बलिदानों की कहानी है। महात्मा गांधी, भगत सिंह, और नेताजी सुभाष चंद्र बोस जैसे नायकों ने देश को आज़ादी दिलाने में महत्वपूर्ण भूमिका निभाई।",
                difficulty: "medium",
                language: "hindi",
            },
            {
                title: "तकनीकी प्रगति",
                content: "आज की दुनिया तकनीकी प्रगति पर आधारित है। इंटरनेट, स्मार्टफोन और आर्टिफिशियल इंटेलिजेंस ने हमारे जीवन को पूरी तरह बदल दिया है। हमें इन तकनीकों का उपयोग सही दिशा में करना चाहिए।",
                difficulty: "hard",
                language: "hindi",
            },
        ],
    });

    console.log("🌱 Database seeded with users, classes, students, and passages!");
}

main()
    .catch((e) => {
        console.error("🔥 Seeder exploded:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
