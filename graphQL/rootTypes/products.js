const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");
const { ProductType } = require("../types");
const { getAllProducts, getProduct } = require("../resolvers/productsResolver");

const products = {
  type: new GraphQLList(ProductType),
  description: "retrieves a list of products",
  args: {
    filter: { type: GraphQLString },
    limit: { type: new GraphQLNonNull(GraphQLInt) },
    offset: { type: new GraphQLNonNull(GraphQLInt) },
  },
  async resolve(_, args) {
    return await getAllProducts(args);
  },
};

const product = {
  type: ProductType,
  description: "retrieves a product",
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_, args, context) {
    if (context.user) {
      return await getProduct(args);
    } else {
      throw new Error("Unauthorized");
    }
  },
};

module.exports = { products, product };
