const {
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLID,
  GraphQLJSONObject,
} = require("graphql");
const { ProductType } = require("../types");
const {
  getAllProducts,
  getProduct,
  addProduct,
} = require("../resolvers/productsResolver");

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

const createProduct = {
  type: ProductType,
  description: "create a product. Only for admins",
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    reference: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    images: { type: new GraphQLList(GraphQLString) },
    characteristics: { type: new GraphQLList(GraphQLString) },
  },
  async resolve(_, args, context) {
    if (context.user && context.user.role === "admin") {
      return await addProduct(args);
    }
    throw new Error("Unauthorized");
  },
};

//crear un metodo para guardar muchos productos como se hace en createProduct pero masivo
const bulkProduct = {
  type: new GraphQLList(ProductType),
  description: "Create many products at once.",
  args: {
    data: { type: new GraphQLList(GraphQLString) },
  },
  async resolve(_, args, context) {
    if (!context.user && context.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const promises = [];
    args.data.forEach((productDataStr) => {
      let product;
      try {
        product = JSON.parse(productDataStr);
      } catch (err) {
        throw new Error(`Invalid input ${productDataStr}`);
      }
      promises.push(addProduct({ ...product }));
    });
    Promise.all(promises)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  },
};

module.exports = { products, product, createProduct, bulkProduct };
