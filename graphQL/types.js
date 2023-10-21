const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User type",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    role: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "Product type",
  fields: () => ({
    _id: { type: GraphQLID },
    reference: { type: GraphQLString },
    title: { type: GraphQLString },
    price: { type: GraphQLFloat },
    description: { type: GraphQLString }, 
    images: { type: new GraphQLList(GraphQLString) },
    caracteristics: { type: new GraphQLList(GraphQLString) }
  }),
});

module.exports = {
  UserType,
  ProductType
};
