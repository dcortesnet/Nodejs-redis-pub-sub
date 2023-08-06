const express = require('express');
const redis = require('redis');
const { v4 } = require('uuid');
const app = express();
const PORT = 3000;
const nameChannel = "message-channel";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const redisClient = redis.createClient({ url: "redis://localhost:6379" });
redisClient.on('error', err => console.log('Redis Client Error', err));

app.post('/messages', (req, res) => {
  try {

    if (!req.body.message) {
      return res.status(400).json({
        detail: "The message property is required"
      });
    }

    const message = {
      id: v4(),
      message: req.body.message,
      date: new Date(),
    };

    redisClient.publish(nameChannel, JSON.stringify(message));
    console.log(`Publishing an Event using Redis to :${req.body.message}`);
    return res.json({
      detail: 'Publishing an Event using Redis successful',
    });
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