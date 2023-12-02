const express = require("express");
const { getUser, updateUser } = require("../../controllers/user");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/user/:id?", authMiddleware, getUser);
router.put("/update", authMiddleware, updateUser);

module.exports = router;

// upload.single("image")
