/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");

const User = require("../models/User");
const Group = require("../models/Group");
const Todo = require("../models/Todo");
const catchAsync = require("../utils/catchAsync");

exports.getGroup = catchAsync(async (req, res, next) => {
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

  const group = await Group.findById(groupId).populate("members").populate("todos").lean();

  return res.json({
    result: "success",
    data: { group },
  });
});

exports.createGroup = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const { _id } = req.user;

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
    members: [_id],
  });

  await User.findByIdAndUpdate(_id, { $push: { group: group._id } });

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

  const group = await Group.findById(groupId).where("members");

  if (group.members.length > 1) {
    await Group.findByIdAndUpdate(groupId, { $pull: { members: req.user._id } });
    await User.findByIdAndUpdate(req.user._id, { $pull: { group: groupId } });

    return res.json({ result: "success" });
  }

  const deletedGroup = await Group.findByIdAndDelete(groupId).where("members").size(1);

  await Todo.deleteMany({ _id: { $in: deletedGroup.todos } });
  await User.findByIdAndUpdate(req.user._id, { $pull: { group: groupId } });

  return res.json({ result: "success" });
});

exports.updateGroupMember = catchAsync(async (req, res, next) => {
  const { groupId } = req.params;
  const { _id } = req.user;

  if (!mongoose.isValidObjectId(groupId)) {
    return res.json({
      result: "error",
      error: {
        message: "유효하지 않은 그룹입니다.",
        status: 400,
      },
    });
  }

  const user = await User.findById(_id).where("group").in(groupId).lean();

  if (user) {
    return res.json({
      result: "error",
      error: {
        message: "이미 존재하는 그룹입니다.",
        status: 400,
      },
    });
  }

  await User.findByIdAndUpdate(_id, { $push: { group: groupId } });
  await Group.findByIdAndUpdate(groupId, { $push: { members: _id } });

  return res.json({ result: "success" });
});
