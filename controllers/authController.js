const jwt = require("jsonwebtoken");

const { firebaseAdminAuth } = require("../config/firebase");
const { secretKey, option } = require("../config/secretkey");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.login = catchAsync(async (req, res) => {
  const idToken = req.headers.authorization.split(" ")[1];
  const verifiedToken = await firebaseAdminAuth.verifyIdToken(idToken);

  if (!verifiedToken) {
    res.json({
      result: "error",
      error: {
        message: "Unauthorized",
        status: 401,
      },
    });
  }

  const { name, email } = verifiedToken;
  const user = await User.findOne({ email }).lean();
  let id = user._id;

  if (!user) {
    const newUser = await User.create({
      name,
      email,
    });

    id = newUser._id;
  }

  const accessToken = jwt.sign({ id }, secretKey, option);

  if (accessToken) {
    res.json({
      result: "success",
      token: accessToken,
    });
  }
  res.json({
    result: "error",
    error: {
      message: "Unauthorized",
      status: 401,
    },
  });
});
