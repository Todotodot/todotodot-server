const Group = require("../models/Group");
const catchAsync = require("../utils/catchAsync");

exports.createGroup = catchAsync(async (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return res.json({
      result: "error",
      error: {
        message: "Group의 이름을 입력하세요.",
        status: 500,
      },
    });
  }

  const group = await Group.create({ title });

  group.members.push(user._id);
  await group.save();

  return res.json({ result: "success" });
});

exports.updateGroup = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const groupId = req.params.id;

  if (!title) {
    return res.json({
      result: "error",
      error: {
        message: "Group의 이름을 입력하세요.",
        status: 500,
      },
    });
  }

  await Group.findByIdAndUpdate(groupId, { title });

  return res.json({ result: "success" });
});

exports.deleteGroup = catchAsync(async (req, res, next) => {
  const groupId = req.params.id;

  await Group.findByIdAndDelete(groupId);
});
