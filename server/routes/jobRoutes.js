// rotues/jobRoutes.js

const express = require("express");
const router = express.Router();
const {
    getJobs,
    createJob,
    updateJob,
    deleteJob,
} = require("../controller/jobController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getJobs); // Get all jobs
router.post("/", protect, createJob); // Add a job
router.put("/:id", protect, updateJob); // Edit a job
router.delete("/:id", protect, deleteJob); // Delete a job

module.exports = router;