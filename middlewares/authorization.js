const jwt = require("jsonwebtoken");

const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

const isLoggedIn = catchAsync(async (req, res, next) => {
  const verifier = req.headers?.authorization.split(" ")[0];
  const token = req.headers?.authorization.split(" ")[1];
  const email = req.headers?.email;

  if (verifier === "Bearer" && token) {
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(id).lean();

    req.user = user;

    return next();
  }

  if (verifier === "Extension" && token && jwt.verify(token, process.env.SECRET_KEY) === process.env.EXTENSION_KEY) {
    let user = await User.findOne({ email }).lean();

    if (!user) {
      user = await User.create({ email, name: email.split("@")[0] });
    }

    req.user = user;
    req.isFromExtension = true;

    return next();
  }

  return res.json({
    result: "error",
    error: {
      message: "유효하지 않은 접근입니다.",
      status: 400,
    },
  });
});

module.exports = isLoggedIn;
