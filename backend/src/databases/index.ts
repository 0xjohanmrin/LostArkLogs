import { DB_URL, REDIS_HOST, REDIS_PORT } from '@config';
import { ConnectOptions } from 'mongoose';
console.log('DB_URL', DB_URL);

export const dbConnection: { url: string; options: ConnectOptions } = {
  url: DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};

export const redisConnection = {
  port: parseInt(REDIS_PORT),
  host: REDIS_HOST,
};
