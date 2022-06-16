/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
require("dotenv").config();
const SocketIo = require("socket.io");

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
        const { todoId } = idData;

        socket.join(todoId);

        const counter = io.sockets.adapter.rooms.get(todoId).size;

        io.to(todoId).emit("documentData", { counter });

        socket.on("loadingSecond", (secondData) => {
          io.to(todoId).emit("loadingSecond", secondData + 1);
        });

        socket.on("gameSecond", (secondData) => {
          io.to(todoId).emit("gameSecond", secondData + 1);
        });

        socket.on("memberClick", (memberClickData) => {
          const { clickUsername, userClick } = memberClickData;
          const memberData = {};

          memberData[clickUsername] = userClick + 1;
          io.to(todoId).emit("memberClick", memberData);
        });

        socket.on("totalClick", (totalClickData) => {
          io.to(todoId).emit("totalClick", totalClickData + 1);
        });
      })
    );
  });
};
