const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const { products, product } = require("./rootTypes/products");
const { userLogin } = require("./rootTypes/users");

const queryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: { products, product },
});

const mutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: { userLogin },
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

module.exports = schema;
