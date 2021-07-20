const { to } = require("kafka-stream-processor");
const pubsub = require("./pubsub");

module.exports = {
  Query: {
    ok() {
      return true;
    },
  },
  Subscription: {
    hotels: {
      subscribe: async (parent, args, context, info) => {
        const { id } = args;
        console.log('----------------------------------------------------------');
        to("hotel-search-requested")({ key: id, value: {} });
        return pubsub.asyncIterator(id);
      },
    },
  },
};
