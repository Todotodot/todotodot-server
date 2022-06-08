const Todo = require("../models/Todo");
const User = require("../models/User");
const Group = require("../models/Group");
const catchAsync = require("../utils/catchAsync");

exports.getGroupsOrPersonalTodos = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  const { name, level, experience, personalTodos, group } = await User.findById(_id).lean();
  const currentUsersTodo = await Todo.find().in("_id", [personalTodos]).lean();
  const currentUsersGroup = await Group.find().in("_id", [group]).lean();

  return res.json({
    result: "success",
    user: {
      name,
      level,
      experience,
      todos: currentUsersTodo,
      groups: currentUsersGroup,
    },
  });
});
