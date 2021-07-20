const { from, to } = require("kafka-stream-processor");

from("hotel-search-requested", (key, value) => {
  setTimeout(() => {
    return to("hotel-search-concluded")({
      key,
      value: {
        hotels: [
          {
            supplier: "expedia",
            name: "Ibis Belo Horizonte",
            value: 52,
          },
        ],
      },
    });
  }, 5000);
});
