const express = require("express");
const loader = require("./loader");
const index = require("./routes/index");
const { unknownPageHandler, errorHandler } = require("./middlewares/errorHandler");
const user = require("./routes/user");
// const group = require("./routes/group");
const app = express();

(async () => {
  await loader(app);

  // app.use(미들웨어); 미들웨어
  app.use("/", index);
  app.use("/users", user);
  // app.use("/groups", group);

  app.use(unknownPageHandler);
  app.use(errorHandler);
})();

module.exports = app;
