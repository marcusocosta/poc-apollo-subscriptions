const ioRedis = require("ioredis");

const options = {
  host: "localhost",
  port: 6379,
  retryStrategy: (times) => {
    return Math.min(times * 50, 2000);
  },
};

const Redis = () => new ioRedis(options);
const redis = new ioRedis(options);

module.exports = { Redis, redis };
