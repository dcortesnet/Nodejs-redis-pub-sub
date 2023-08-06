const express = require('express');
const redis = require('redis');
const app = express();
const PORT = 3001;
const nameChannel = "message-channel";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const messagesStorage = [];

const redisClient = redis.createClient({ url: "redis://localhost:6379" });
redisClient.on('error', err => console.log('Redis Client Error', err));

redisClient.subscribe(nameChannel, (message) => {
  console.log("Capturing an Event using Redis to: " + message);
  messagesStorage.push(JSON.parse(message));
});

app.get("/messages", (req, res) => {
  try {
    return res.json({ messages: messagesStorage });
  } catch (error) {
    return res.status(500).json({
      detail: error.message
    });
  }
});

redisClient.connect().then(() => {
  console.log("Redis connected")
  app.listen(PORT, () => {
    console.log(` 😀 server on port ${PORT}  `);
  });
});