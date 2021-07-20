const { startup } = require("kafka-stream-processor");
const random = require('random');
const application = require("./application");
require("./streams");

const PORT = process.env.PORT;
Promise.all([
  startup(),
  application.startup(PORT),
]);
