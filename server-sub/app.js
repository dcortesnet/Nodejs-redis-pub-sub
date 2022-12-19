const express = require('express');
const redis = require('redis');
const dotenv = require('dotenv');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
dotenv.config();

const messages = [];

const clientRedis = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

clientRedis.on("error", (err) => {
  console.log("Redis error", err);
});

clientRedis.subscribe("message-channel");

clientRedis.on("message", (channel, message) => {
  console.log("Capturing an Event using Redis to: " + message);
  messages.push(JSON.parse(message));
});

app.get("/messages", (req, res) => {
  try {
    return res.json({ messages });
  } catch (error) {
    return res.status(500).json({
      detail: error.message
    });
  }
});

app.listen(3002, () => {
  console.log("Server running port 3002");
});