const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const { UserType } = require("./types");
const {products} = require("./rootTypes/products")

const queryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {products},
});

const mutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {},
});

const schema = new GraphQLSchema({
  query: queryType,
});

module.exports = schema;
