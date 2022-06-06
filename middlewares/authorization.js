const jwt = require("jsonwebtoken");
const User = require("../models/User");

const catchAsync = require("../utils/catchAsync");

const isLoggedIn = catchAsync(async (req, res, next) => {
  const { profile } = req.localStorage;

  if (!profile) {
    return res.json({
      result: "error",
      error: {
        message: "유효하지 않은 접근입니다.",
        status: 400,
      },
    });
  }

  const userId = jwt.verify(profile, process.env.SECRET_KEY);
  const user = await User.findById(userId).lean();

  req.user = user;
  next();
});

module.exports = isLoggedIn;
