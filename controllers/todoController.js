const User = require("../models/User");
const Todo = require("../models/Todo");
const catchAsync = require("../utils/catchAsync");

exports.createTodo = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    res.json({
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

  res.json({
    result: "success",
  });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    res.json({
      result: "error",
      error: {
        message: "Todo의 제목을 입력하세요.",
        status: 400,
      },
    });
  }

  await Todo.findOneAndUpdate({ _id: req.params.todoId }, { title, content });

  res.json({
    result: "success",
  });
});
