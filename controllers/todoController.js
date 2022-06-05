const User = require("../models/User");
const Todo = require("../models/Todo");
const { catchAsync } = require("../utils/catchAsync");

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

  user.personalTodos.push(newTodo);
  await user.save();

  res.json({
    result: "success",
  });
});
