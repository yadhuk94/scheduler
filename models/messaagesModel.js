const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  message: { type: String, required: true },
});

const Messages = mongoose.model("Messages", messagesSchema);

module.exports = Messages;
