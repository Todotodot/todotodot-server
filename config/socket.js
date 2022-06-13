/* eslint-disable comma-dangle */
require("dotenv").config();
const SocketIo = require("socket.io");

const User = require("../models/User");
const Group = require("../models/Group");
const catchAsync = require("../utils/catchAsync");

exports.socketIo = (server) => {
  const io = SocketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected...");

    socket.on(
      "gameRoom",
      catchAsync(async (idData) => {
        const { userId, todoId, groupId } = idData;

        const user = await User.findById(userId);
        const group = await Group.findById(groupId);

        socket.join(todoId);

        if (user && group) {
          socket.to(todoId).emit("userGroupData", { user, group });
        }

        socket.on("memberClick", (memberClickData) => {
          const { username, userClick } = memberClickData;
          const memberClick = {};
          memberClick[username] = userClick + 1;
          socket.to(todoId).emit("memberClick", memberClick);
        });

        socket.on("totalClick", (totalClickData) => {
          socket.to(todoId).emit("totalClick", totalClickData + 1);
        });
      })
    );
  });
};
