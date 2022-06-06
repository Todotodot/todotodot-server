const mongoose = require("mongoose");
const Group = require("../models/Group");
const catchAsync = require("../utils/catchAsync");

exports.getGroupTodos = catchAsync(async (req, res, next) => {
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

  return res.json({
    result: "success",
    data: group.todos,
  });
});

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

  const group = await Group.create({ title });

  group.members.push(user._id);
  await group.save();

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

  await Group.findByIdAndDelete(groupId);

  return res.json({ result: "success" });
});
