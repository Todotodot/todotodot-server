const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    todos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
    }],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Group", groupSchema);
