const express = require("express");
const classRoutes = require("./routes/classRoutes");
const studentRoutes = require("./routes/studentsRoutes");
const assessmentRoutes = require("./routes/assesmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes")
const passageRoutes = require("./routes/passageRoute");
const cors = require("cors");

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://readingtracker.llf.org.in');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
// Add before your routes
app.use(express.json());

// Mount at '/api/class'
app.use("/api/class", classRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/assessment", assessmentRoutes);
app.use("/api/passage", passageRoutes);
app.use("/api/dashboard", dashboardRoutes);


app.get("/", (req, res) => {
    res.send("It's running");
});

app.listen(2000, () => {
    console.log("Server is running on port 2000");
});
