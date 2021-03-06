import express from 'express';
import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const clientRedis = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD
});

clientRedis.on('error', err => {
  console.log('Redis error', err)
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

clientRedis.subscribe('user-notify');
clientRedis.on('message', (channel, message)=> {
  console.log('Received data : ' + message);
});

app.get('/', (req, res) => {
  return res.send('Server sub');
});

app.listen(3002, () => {
  console.log('Server running');
});
