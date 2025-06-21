// controller/jobController.js
const prisma = require("../prismaClient");

// Get all jobs for the logged-in user
exports.getJobs = async (req, res) => {
    try {
        const jobs = await prisma.job.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: "desc" },
        });
        res.json(jobs);
    } catch (error) {
        console.error("Error fetching jobs:", error );
        res.status(500).json({ error: "Internal server error"});
    }
};

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const { company, title, status, jobLink, dateApplied, notes } = req.body;

        const job = await prisma.job.create({
            data: {
                userId: req.user.id,
                company,
                title,
                status,
                jobLink,
                dateApplied: dateApplied ? new Date(dateApplied) : undefined,
                notes,
            },
        });

        res.status(201).json(job);
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ error: "Internal server error"});
    }
};

// Update a job
exports.updateJob = async (req, res) => {
    try {
        const jobId = parseInt(req.params.id);
        const { company, title, status, jobLink, dateApplied, notes } = req.body;

        // Ensure the job belongs to a registered user
        const job = await prisma.job.findUnique({ where: { id: jobId }});
        if (!job || job.userId !== req.user.id) {
            return res.status(404).json({ error: "Job not found or unauthorized"});
        }

        const updatedJob = await prisma.job.update({
            where: { id: jobId },
            data: {
                company,
                title,
                status,
                jobLink,
                dateApplied: dateApplied ? new Date(dateApplied) : undefined,
                notes,
            },
        });

        res.json(updatedJob);
    } catch (error) {
        console.error("Error updating job: ", error);
        res.status(500).json({error: "Internal server error"});
    }   
};

// Delete a job
exports.deleteJob = async (req, res) => {
    try {
        const jobId = parseInt(req.params.id);

        // Make sure the job belongs to the user
        const job = await prisma.job.findUnique({ where: { id: jobId }});
        if (!job || job.userId !== req.usre.id) {
            return res.status(404).json({ error: "Job not found or unauthorized"});
        }

        await prisma.job.delete({ where: { id: jobId }});

        res.json({ message: "Job deleted successfully"});
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ error: "Internal server error"});
    }
};