const { from, to } = require("kafka-stream-processor");

from("hotel-search-requested", (key, value) => {
  setTimeout(() => {
    return to("hotel-search-concluded")({
      key,
      value: {
        hotels: [
          {
            id: key,
            supplier: "booking",
            name: "Ibis Belo Horizonte",
            value: 100,
            requester: value.requester,
          },
          {
            id: key,
            supplier: "booking",
            name: "Mercure São Paulo",
            value: 200,
            requester: value.requester,
          },
        ],
      },
    });
  }, 15000);
});
