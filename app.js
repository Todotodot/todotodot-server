require("dotenv").config();
require("./config/mongodb");

const express = require("express");
const app = express();

const createError = require("http-errors");
const cors = require("cors");

const index = require("./routes/index");

app.use(cors({
  origin: "http://localhost:3000",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", index);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({
    "result": "error",
    "error": {
      "message": "Request Failed",
      "status": 500,
    }
  });
});

module.exports = app;
