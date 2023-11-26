const express = require("express");
const router = express.Router();

//index route
router.get("/", (req, res) => {
  res.json({ message: "welcome to TaitansTech Application" });
});

//auth route
router.use("/auth", require("./auth"));
//user route
router.use("/users", require("./user"));
router.use("/posts", require("./post"));

module.exports = router;
