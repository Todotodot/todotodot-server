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

  if (groupId) {
    const group = user.group.findOne({ groupId });

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

  await Todo.findOneAndUpdate({ _id: todoId }, { title, content });

  return res.json({
    result: "success",
  });
});
