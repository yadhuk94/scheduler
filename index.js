const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./utils/connectdb");
const messagesRoutes = require("./routes/messagesRoutes");

dotenv.config({ path: "./config.env" });
const app = express();

connectDB();

app.use(express.json());

app.use("/api/v1/messages", messagesRoutes);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
