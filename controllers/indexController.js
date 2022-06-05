const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.readIndex = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { buttonType } = req.query;
  const currentUser = User.findById(user._id);

  if (buttonType === "group") {
    return res.json({
      result: "success",
      data: currentUser.group,
    });
  }

  return res.json({
    result: "success",
    data: currentUser.personalTodos,
  });
});
