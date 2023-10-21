const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const { ProductType } = require("../types");
const {getAllProducts} = require("../resolvers/productsResolver");

const products = {
  type: new GraphQLList(ProductType),
  description: "retrieves a list of products",
  args: {
    filter: { type: GraphQLString },
    limit: { type: new GraphQLNonNull(GraphQLInt) },
    offset: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve (_, args) {return await getAllProducts(args)},
};

module.exports = { products };
