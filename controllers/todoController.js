const mongoose = require("mongoose");

const User = require("../models/User");
const Group = require("../models/Group");
const Todo = require("../models/Todo");
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

exports.createTodo = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    return res.json({
      result: "error",
      error: {
        message: "Todo의 제목을 입력하세요.",
        status: 400,
      },
    });
  }

  const newTodo = await Todo.create({
    title,
    content,
    creator: req.user.id,
  });

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

  if (groupId) {
    await Group.findByIdAndUpdate(groupId, { $push: { todos: newTodo._id } });
  } else {
    await User.findByIdAndUpdate(req.user.id, { $push: { personalTodos: newTodo._id } });
  }

  return res.json({ result: "success" });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    return res.json({
      result: "error",
      error: {
        message: "Todo의 제목을 입력하세요.",
        status: 400,
      },
    });
  }

  const { todoId } = req.params;

  if (!mongoose.isValidObjectId(todoId)) {
    return res.json({
      result: "error",
      error: {
        message: "유효하지 않은 Todo입니다.",
        status: 400,
      },
    });
  }

  await Todo.findByIdAndUpdate(todoId, { title, content });

  return res.json({ result: "success" });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const { groupId, todoId } = req.params;

  if (!mongoose.isValidObjectId(groupId)) {
    return res.json({
      result: "error",
      error: {
        message: "유효하지 않은 그룹입니다.",
        status: 400,
      },
    });
  }

  if (!mongoose.isValidObjectId(todoId)) {
    return res.json({
      result: "error",
      error: {
        message: "유효하지 않은 Todo입니다.",
        status: 400,
      },
    });
  }

  Todo.findByIdAndDelete(todoId);

  if (groupId) {
    await Group.findByIdAndUpdate(groupId, { $pull: { todos: todoId } });
  } else {
    await User.findByIdAndUpdate(req.user.id, { $pull: { personalTodos: todoId } });
  }

  return res.json({ result: "success" });
});
