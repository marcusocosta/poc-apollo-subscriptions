// @ts-check
const { createServer } = require("http");
const express = require("express");
const { execute, subscribe } = require("graphql");
const { ApolloServer } = require("apollo-server-express");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { resolvers, typeDefs } = require("./graphql");

const app = express();
const httpServer = createServer(app);

const startup = async (port) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
  });
  await server.start();
  server.applyMiddleware({ app });

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  httpServer.listen(port, () => {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${port}${server.graphqlPath}`
    );
    console.log(
      `🚀 Subscription endpoint ready at ws://localhost:${port}${server.graphqlPath}`
    );
  });
};

module.exports = {
  startup,
};
