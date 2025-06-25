// routes/userRotes.js
const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    registerUser,
    loginUser,
    getUserProfile,
    updateUser,
    deleteUser
} = require("../controller/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserProfile);
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;