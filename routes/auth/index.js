const express = require("express");
const router = express.Router();
const { register, login } = require("../../controllers/auth");
const validator = require("../../middleware/validator");

router.post("/register", validator("register"), register);
router.post("/login", validator("login"), login);

module.exports = router;
