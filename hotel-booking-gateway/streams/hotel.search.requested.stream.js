const { from, to } = require("kafka-stream-processor");

from("hotel-search-requested", (key, value) => {
  setTimeout(() => {
    return to("hotel-search-concluded")({
      key,
      value: {
        hotels: [
          {
            supplier: "booking",
            name: "Ibis Belo Horizonte",
            value: 60,
          },
          {
            supplier: "booking",
            name: "Mercure São Paulo",
            value: 80,
          },
        ],
      },
    });
  }, 15000);
});
