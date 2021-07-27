const { pubsub } = require("../lib");
const config = require("voll-config");

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
        return pubsub.asyncIterator("hotel-search-requested", id, {
          requester: config.get("PORT"),
          id,
        });
      },
    },
  },
};
