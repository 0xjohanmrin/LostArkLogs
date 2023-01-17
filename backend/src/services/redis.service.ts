import { logger } from '@/utils/logger';
import Redis from 'ioredis';

class RedisService {
  public static connection: undefined | Redis;
  public static connected = false;

  public static async connect(port: number, host: string) {
    if (RedisService.connected) return true;
    RedisService.connection = new Redis({
      port: port,
      host: host,
      username: 'default',
      password: 'reyuwFbP69jrdZQWgi5LRNcxnTHKY2ct',
      enableReadyCheck: true,
      maxRetriesPerRequest: 2,
    });

    RedisService.connection.on('error', err => {
      logger.error('REDIS ERR:', err);
    });

    RedisService.connection.on('ready', () => {
      logger.info('Redis connected');
      RedisService.connected = true;
    });

    RedisService.connection.on('reconnecting', () => {
      logger.info('Redis reconnecting');
      RedisService.connected = false;
    });

    RedisService.connection.on('end', () => {
      logger.info('Redis disconnected');
      RedisService.connected = false;
    });
  }

  public static async ping() {
    if (RedisService.connection && RedisService.connected) return RedisService.connection.ping();
    else return Promise.reject('Redis not connected');
  }

  public static async get(key: string) {
    if (RedisService.connection && RedisService.connected) return RedisService.connection.get(key);
    else return Promise.reject('Redis not connected');
  }

  public static async mget(keys: string[]) {
    if (RedisService.connection && RedisService.connected) return RedisService.connection.mget(keys);
    else return Promise.reject('Redis not connected');
  }

  public static async set(key: string, value: string, expireType?: 'KEEPTTL' | 'PX' | 'EX' | undefined, expireTime?: number) {
    if (RedisService.connection && RedisService.connected) {
      switch (expireType) {
        case 'KEEPTTL':
          return RedisService.connection.set(key, value, 'KEEPTTL');
        case 'PX':
          return RedisService.connection.set(key, value, 'PX', expireTime);
        case 'EX':
          return RedisService.connection.set(key, value, 'EX', expireTime);
        default:
          return RedisService.connection.set(key, value);
      }
    } else return Promise.reject('Redis not connected');
  }

  public static async del(key: string) {
    if (RedisService.connection && RedisService.connected) return RedisService.connection.del(key);
    else return Promise.reject('Redis not connected');
  }

  public static async mdel(keys: string[]) {
    if (RedisService.connection && RedisService.connected) return RedisService.connection.del(keys);
    else return Promise.reject('Redis not connected');
  }

  public static async flush() {
    if (RedisService.connection && RedisService.connected) return RedisService.connection.flushdb();
    else return Promise.reject('Redis not connected');
  }

  public static async keys(match = '*') {
    if (RedisService.connection && RedisService.connected) return RedisService.connection.keys(match);
    else return Promise.reject('Redis not connected');
  }

  public static async pexpiretime(key: string) {
    if (RedisService.connection && RedisService.connected) return RedisService.connection.pexpiretime(key);
    else return Promise.reject('Redis not connected');
  }

  public static async info() {
    if (RedisService.connection && RedisService.connected) return RedisService.connection.info();
    else return Promise.reject('Redis not connected');
  }
}

export default RedisService;
