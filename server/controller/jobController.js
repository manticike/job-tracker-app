// controller/jobController.js

// Import the prismaClient to be use here
const prisma = require("../prismaClient");


// this function creates a job
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
        console.error("Error creating the job", error);
        res.status(500).json({ error: "Internal server error "});
    }
}

// This function will retrieve all the jobs a particular user has
exports.getJobs = async (req, res) => {
    try {
        const jobs = await prisma.job.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc'},
        });
        // show all the jobs to the user
        res.json(jobs)
    } catch (error) {
        console.error("Error retrieving jobs", error);
        res.status(500).json({error: "Internal server error"});
    }
}

// The function below will update the job

exports.updateJob = async (req, res) => {
    try {
        // Retrieving the data from the frontend and updating it
        const jobId = parseInt(req.params.id);
        const { company, title, status, jobLink, dateApplied, notes} = req.body;

        // Check to see if the job is available or the user has the right to edit the job
        const job = await prisma.job.findUnique({ where: { id: jobId }});
        if (!job || job.userId !== req.user.id) {
            return res.status(404).json({ error: "Job not found or unauthorized"});
        }

        // now update the data
        const updatedJob = await prisma.job.update({
            where: { id: jobId },
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

        // show the updated job
        res.json(updatedJob);
    } catch (error) {
        
        console.error("Error Updating the job", error);
        res.status(500).json({ error: "Internal server error"})
    }
};

// The function deletes a job
exports.deleteJob = async (req, res) => {
    try {
        const jobId = parseInt(req.params.id);
        
        const job = await prisma.job.findUnique({ where: { id: jobId }});
        if (!job || job.userId !== req.user.id) {
            return res.status(404).json({ error: "Job not found or unauthorized"})
        }

        await prisma.job.delete({ where: { id: jobId }});

        res.json({ message: "Job deleted successful"});
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ error: "Internal server error"});
    }
};