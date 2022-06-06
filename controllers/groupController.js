const mongoose = require("mongoose");
const User = require("../models/User");
const Group = require("../models/Group");
const catchAsync = require("../utils/catchAsync");

exports.createGroup = catchAsync(async (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return res.json({
      result: "error",
      error: {
        message: "Group의 이름을 입력하세요.",
        status: 400,
      },
    });
  }

  const group = await Group.create({
    title,
    members: [req.user.id],
  });

  await User.findByIdAndUpdate(req.user.id, { $push: { group: group._id } });

  return res.json({ result: "success" });
});

exports.updateGroup = catchAsync(async (req, res, next) => {
  const { groupId } = req.params;
  const { title } = req.body;

  if (!mongoose.isValidObjectId(groupId)) {
    return res.json({
      result: "error",
      error: {
        message: "유효하지 않은 그룹입니다.",
        status: 400,
      },
    });
  }

  if (!title) {
    return res.json({
      result: "error",
      error: {
        message: "Group의 이름을 입력하세요.",
        status: 400,
      },
    });
  }

  await Group.findByIdAndUpdate(groupId, { title });

  return res.json({ result: "success" });
});

exports.deleteGroup = catchAsync(async (req, res, next) => {
  const { groupId } = req.params;

  if (!mongoose.isValidObjectId(groupId)) {
    return res.json({
      result: "error",
      error: {
        message: "유효하지 않은 그룹입니다.",
        status: 400,
      },
    });
  }

  const group = await Group.findById(groupId);

  if (group.members.length > 1) {
    await User.findByIdAndUpdate(req.user.id, { $pull: { group: group._id } });
  }

  return res.json({ result: "success" });
});
