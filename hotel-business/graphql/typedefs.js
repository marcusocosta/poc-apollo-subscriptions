const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    ok: Boolean
  }

  type Subscription {
    hotels(id: ID): [Hotels]
  }

  type Hotels {
    id: ID
    supplier: String
    name: String
    value: Int
    requester: String
    responser: String
  }
`;