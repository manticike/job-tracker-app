// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

// Importing the routes
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");

// Initializing the app and Prisma
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api/users", userRoutes); // for signups/login
app.use("/api/jobs", jobRoutes);    // for job management

// Routes
app.get("/", (req, res) => {
    res.send("Job Tracker API is running ");
});


// Starting the local server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});