const express = require('express');
const redis = require('redis');
const dotenv = require('dotenv');
const { v4 } = require('uuid');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
dotenv.config();

const clientRedis = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

clientRedis.on('error', (err) => {
  console.log('Redis error', err);
});

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

    clientRedis.publish('message-channel', JSON.stringify(message));
    console.log(`Publishing an Event using Redis to :${req.body.message}`);
    return res.json({
      detail: 'Publishing an Event using Redis successful',
    });
  } catch (error) {
    return res.status(500).json({
      detail: error.message
    })
  }
});

app.listen(3001, () => {
  console.log("Server running port 3001");
});