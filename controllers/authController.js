const jwt = require("jsonwebtoken");

const { firebaseAdminAuth } = require("../config/firebase");
const secretKey = require("../config/secretkey").secretKey;
const options = require("../config/secretkey").option;

const User = require("../models/User");

exports.login = async (req, res) => {
  try {
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
    const user = await User.findOne({ email });

    if (!user) {
      await User.create({
        name,
        email,
      });
    }

    const payload = {
      email: email,
    };

    const accessToken = jwt.sign(payload, secretKey, options);

    if (accessToken) {
      res.json({
        result: "success",
        token: accessToken,
      });
    }
  } catch (error) {
    res.json({
      result: "error",
      error: {
        message: "Unauthorized",
        status: 401,
      },
    });
  }
};
