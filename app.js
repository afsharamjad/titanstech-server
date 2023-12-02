const express = require("express");
const fs = require("fs");
require("dotenv").config();
const cors = require("cors"); //cors access
const morgan = require("morgan");
const helmet = require("helmet"); // for security
const createHttpError = require("http-errors");

//run application
const app = express();

//Middlewares

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//

//routes Middleware
app.use(require("./routes"));

//* Catch HTTP 404
app.use((req, res, next) => {
  next(createHttpError(404));
});
//* Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

module.exports = app;
