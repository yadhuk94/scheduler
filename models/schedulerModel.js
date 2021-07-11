const mongoose = require("mongoose");

const schedulerSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  message: { type: String, required: true },
  jobCompleted: { type: Boolean, default: false, required: true },
});

const Scheduler = mongoose.model("Scheduler", schedulerSchema);

module.exports = Scheduler;
