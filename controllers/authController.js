const jwt = require("jsonwebtoken");

const { firebaseAdminAuth } = require("../config/firebase");
const { secretKey, option } = require("../config/secretkey");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.login = catchAsync(async (req, res, next) => {
  const idToken = req.headers.authorization.split(" ")[1];
  const verifiedToken = await firebaseAdminAuth.verifyIdToken(idToken);

  if (!verifiedToken || !idToken) {
    return res.json({
      result: "error",
      error: {
        message: "유효하지 않은 유저입니다.",
        status: 401,
      },
    });
  }

  const { name, email } = verifiedToken;
  let user = await User.findOne({ email }).lean();

  if (!user) {
    user = await User.create({
      name,
      email,
    });
  }

  if (name !== user.name) {
    await User.findByIdAndUpdate(user._id, { $set: { name } });
  }

  const accessToken = jwt.sign({ id: user._id }, secretKey, option);

  if (accessToken) {
    return res.json({
      result: "success",
      token: accessToken,
    });
  }
});
