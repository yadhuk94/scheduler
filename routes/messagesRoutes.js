const express = require("express");
const {
  scheduler,
  getMessages,
  getSchedules,
} = require("../controllers/messagesController");

const router = express.Router();

router.route("/schedule").post(scheduler).get(getSchedules);

router.route("/").get(getMessages);

module.exports = router;
