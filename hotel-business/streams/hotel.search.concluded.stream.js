const { from } = require("kafka-stream-processor");
const pubsub = require("../graphql/pubsub");

from("hotel-search-concluded", (key, value) => {
  pubsub.publish(key, value);
});
