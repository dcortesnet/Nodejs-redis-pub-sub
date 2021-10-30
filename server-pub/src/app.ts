import express, { response } from 'express';
import redis from 'redis';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

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

app.get('/', (req, res) => {
  const message = {
    id: uuidv4(),
    message: 'Message redis'
  }
  clientRedis.publish('user-notify', JSON.stringify(message));
  console.log('Publishing an Event using Redis')
  res.send('Publishing an Event using Redis');
});

app.listen(3001, () => {
  console.log('Server running');
});
