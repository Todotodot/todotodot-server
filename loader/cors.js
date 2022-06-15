const cors = require("cors");

const whiteList = ["http://localhost:3000", process.env.CHROME_EXTENSION];
const corsOption = {
  credentials: true,
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) >= 0 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed"));
    }
  },
};

module.exports = (app) => {
  app.use(cors(corsOption));
};
