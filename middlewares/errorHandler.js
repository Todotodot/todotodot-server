exports.unknownPageHandler = (req, res, next) => {
  try {
    res.send("Unknown page");
  } catch (err) {
    next(err);
  }
};

exports.errorHandler = (err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({
    result: "error",
    error: {
      message: "Request Failed",
      status: 500,
    },
  });
};
