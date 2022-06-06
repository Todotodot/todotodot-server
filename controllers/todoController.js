const mongoose = require("mongoose");
const User = require("../models/User");
const Todo = require("../models/Todo");
const catchAsync = require("../utils/catchAsync");

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

  const user = await User.findOne({ email: req.user.email });

  const newTodo = await Todo.create({
    title,
    content,
    creator: user._id,
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
    const group = user.group.findById(groupId);

    group.todos.push(newTodo._id);
  } else {
    user.personalTodos.push(newTodo.id);
  }

  await user.save();

  return res.json({
    result: "success",
  });
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

  await Todo.findByIdAndUpdate({ _id: todoId }, { title, content });

  return res.json({
    result: "success",
  });
});
