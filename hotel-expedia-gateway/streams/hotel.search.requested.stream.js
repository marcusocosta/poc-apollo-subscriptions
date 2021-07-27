const { from, to } = require("kafka-stream-processor");

from("hotel-search-requested", (key, value) => {
  setTimeout(() => {
    return to("hotel-search-concluded")({
      key,
      value: {
        hotels: [
          {
            id: key,
            supplier: "expedia",
            name: "Ibis Belo Horizonte",
            value: 250,
            requester: value.requester,
          },
        ],
      },
    });
  }, 5000);
});
