const { to } = require("kafka-stream-processor");
const { RedisPubSub } = require("graphql-redis-subscriptions");
const { Redis, redis } = require("./redis");

const pubsub = new RedisPubSub({
  publisher: Redis(),
  subscriber: Redis(),
});

const asyncIterator = async (topicName, id, filter) => {
  const key = concatkey(topicName, id);
  if (!(await hasKey(key))) {
    await redis.set(`${topicName}-${id}`, filter);
    await to(topicName)({ key: id, value: filter });
  }
  return pubsub.asyncIterator(id);
};

const hasKey = async (key) => ((await redis.exists(key)) ? true : false);
const concatkey = (topicName, id) => `${topicName}-${id}`;

const publish = async (key, value) => pubsub.publish(key, value);

module.exports = {
  asyncIterator,
  publish,
};
