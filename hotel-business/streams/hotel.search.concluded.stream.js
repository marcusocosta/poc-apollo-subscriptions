const { from } = require("kafka-stream-processor");
const { pubsub } = require("../lib");
const config = require("voll-config");

from("hotel-search-concluded", (key, value) => {
  const { hotels } = value;
  pubsub.publish(key, {
    hotels: hotels.map((hotel) => ({
      ...hotel,
      responser: config.get("PORT"),
    })),
  });
});
