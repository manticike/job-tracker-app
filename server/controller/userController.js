//controllers/userController.js

const prisma = require("../prismaClient");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// Register user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await prisma.user.findUnique({ where: { email }});
        if (existing) return res.status(400).json({ error: "Email already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        res.status(201).json({ message: "User registered", userId: user.id });
    } catch (error) {
        console.error("Rgister error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.statu(400).json({ error: "Invalid email or password" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ error: "Invalid email or password "});

        const token = generateToken(user.id);

        res.status(200).json({ 
            message: "Login successful", 
            token,
            userId: user.id,
            name: user.name,
            email: user.email
     });
    } catch (error) {
        console.error("Login error: ", error);
        res.status(500).json({ error: "Internal server error"});
    }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, createdAt: true },
        });

        if (!user) return res.status(404).json({ error: "User not found"});
        res.json(user);
    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ error: "Internal server error"});
    }
};


// Update Profile
exports.updateUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const { name, email, password } = req.body;

        const data = {};
        if(name) data.name = name;
        if (email) data.email = email;
        if (password) data.password = await bcrypt.hash(password, 10);

        const user = await prisma.user.update({
            where: { id: userId },
            data,
        });

        res.json({ message: "User updated", user});
    } catch (error) {
        console.error("Update error", error);
        res.status(500).json({ error: "Internal server error"});
    }
};

// Delete User

exports.deleteUser = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        await prisma.user.delete({ where: { id: userId }});
        res.json({ message: "User deleted "});
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ error: "Internal server error"});
    }
}