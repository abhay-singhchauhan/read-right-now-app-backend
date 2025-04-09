const express = require("express");
const classRoutes = require("./routes/classRoutes");
const studentRoutes = require("./routes/studentsRoutes");
const assessmentRoutes = require("./routes/assesmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes")
const passageRoutes = require("./routes/passageRoute");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
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
