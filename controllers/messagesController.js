const cron = require("node-schedule");

const Messages = require("../models/messaagesModel");
const Scheduler = require("../models/schedulerModel");

exports.scheduler = async (req, res) => {
  try {
    const { message, date, time } = req.body;

    if (!message) {
      res.status(400).json({
        status: "fail",
        message: "Please add a message",
      });
    }

    if (date) {
      let [year, month, day] = date.split("-").map((el) => el * 1);
      let [hour, minute, second] = time
        ? time.split(":").map((el) => el * 1)
        : [0, 0, 0];
      month = month - 1;
      minute = minute ? minute : 0;
      second = second ? second : 0;

      const jobDate = new Date(year, month, day, hour, minute, second);

      if (jobDate <= new Date()) {
        return res.status(400).json({
          status: "fail",
          message: "Please enter a valid future date and time",
        });
      }

      const schedule = await Scheduler.create({ date: jobDate, message });

      cron.scheduleJob(jobDate, async () => {
        await Scheduler.findByIdAndUpdate(schedule._id, { jobCompleted: true });
        await Messages.create({ date: new Date(), message });
      });

      return res.status(201).json({
        status: "success",
        data: {
          date: jobDate,
          message,
        },
      });
    }

    const jobDate = new Date();
    await Messages.create({ date: new Date(), message });

    res.status(201).json({
      status: "success",
      data: {
        date: jobDate,
        message,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};

exports.getMessages = async (re, res) => {
  try {
    const messages = await Messages.find();
    res.status(200).json({
      status: "success",
      data: {
        messages,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};

exports.getSchedules = async (re, res) => {
  try {
    const schedules = await Scheduler.find();
    res.status(200).json({
      status: "success",
      data: {
        schedules,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};
