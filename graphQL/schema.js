const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const { products, product, createProduct, bulkProduct } = require("./rootTypes/products");
const { userLogin, user, createUser } = require("./rootTypes/users");

const queryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: { products, product, user },
});

const mutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: { userLogin, createUser, createProduct, bulkProduct },
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

module.exports = schema;
