const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashedPass = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};

const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const createToken = (id) => {
  const token = jwt.sign(
    {
      userId: id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: 60 * 60 * 60 * 60 }
  );
  return token;
};

module.exports = { hashedPass, comparePassword, createToken };
