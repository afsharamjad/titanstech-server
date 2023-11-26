const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");

const authMiddleware = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    next(createHttpError(401));
    return;
  }
  const token = authHeader?.split(" ")[1];

  try {
    const userToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.body.user = {
      userId: userToken.userId,
    };

    next();
  } catch (error) {
    console.log(error);
    next(createHttpError(401));
  }
};

module.exports = authMiddleware;
