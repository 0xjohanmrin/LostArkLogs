import { DB_HOST, DB_PORT, DB_DATABASE, REDIS_HOST, REDIS_PORT } from '@config';
import { ConnectOptions } from 'mongoose';

export const dbConnection: { url: string; options: ConnectOptions } = {
  url: `mongodb+srv://admin:admin23@cluster0.natgise.mongodb.net/?retryWrites=true&w=majority`,
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
