// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { id: decoded.userId };
            next();
        } catch (error) {
            return res.status(401).json({ error: "Token is Invalid"});
        }
    } else {
        return res.status(401).json({ error: "Not authorized, no token "});
    }
};

module.exports = protect;