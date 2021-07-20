const { RedisPubSub } = require("graphql-redis-subscriptions");
const Redis = require("ioredis");

const options = {
  host: '172.17.0.1',
  port: 6379,
  retryStrategy: times => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
};

module.exports = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});